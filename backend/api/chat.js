import { GoogleGenerativeAI } from "@google/generative-ai";


const API_KEY = process.env.GEMINI_API_KEY || "";

let modelInstance = null;
function getModel() {
  if (!API_KEY) return null;
  if (modelInstance) return modelInstance;
  const genAI = new GoogleGenerativeAI(API_KEY);
  modelInstance = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.9,
      topK: 50,
      topP: 0.98,
      maxOutputTokens: 1024,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ],
  });
  return modelInstance;
}

// Prompt personalizado
const SYSTEM_PROMPT = `Você é o RoboTech Assistant, um assistente de IA amigável e conversacional. 

REGRAS CRÍTICAS - LEIA COM ATENÇÃO:
- NUNCA use respostas prontas, genéricas ou clichês
- NUNCA comece com "Olá! Como posso ajudar?" ou similares
- NUNCA use frases como "Posso ajudar com..." ou "Estou aqui para..."
- SEMPRE responda diretamente à pergunta específica do usuário
- Seja natural como se fosse uma pessoa real conversando
- Adapte seu tom ao contexto da pergunta
- Se for sobre programação/tecnologia, seja detalhado e útil
- Se for sobre outros assuntos, seja informativo mas acessível
- Use emojis ocasionalmente para tornar a conversa mais amigável
- Mantenha as respostas em português brasileiro
- Seja direto e evite textos muito longos desnecessariamente

EXEMPLO DE COMO NÃO RESPONDER:
❌ "Olá! Como posso ajudar você hoje?"
❌ "Posso ajudar com programação, tecnologia..."
❌ "Estou aqui para responder suas perguntas"

EXEMPLO DE COMO RESPONDER:
✅ "Para criar um loop em JavaScript, você pode usar..."
✅ "A capital do Brasil é Brasília, localizada no Distrito Federal..."
✅ "Inteligência artificial é um campo da computação que..."

Responda de forma natural e personalizada para cada pergunta específica.`;

// Função para gerar ID único de sessão
function generateSessionId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { message, sessionId } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Mensagem é obrigatória' });
  }

  try {
    const model = getModel();
    if (!model) {
      return res.status(500).json({
        reply: "Configuração ausente no servidor. Defina GEMINI_API_KEY nas variáveis de ambiente.",
        sessionId: sessionId || generateSessionId(),
      });
    }
    // Gerar ou usar sessionId existente
    const currentSessionId = sessionId || generateSessionId();
    
    
    let fullPrompt = SYSTEM_PROMPT + "\n\n";
    
  
    fullPrompt += `Usuário: ${message}\n\nIMPORTANTE: Responda diretamente à pergunta do usuário. NÃO use saudações genéricas, NÃO pergunte como pode ajudar, NÃO use frases prontas. Seja direto e natural.\n\nRoboTech:`;
    
    // Gerar resposta
    const result = await model.generateContent(fullPrompt);
    const reply = result?.response?.text() || "Desculpe, não consegui processar sua pergunta. Pode tentar novamente?";
    
    res.status(200).json({ 
      reply: reply.trim(),
      sessionId: currentSessionId 
    });
    
  } catch (error) {
    console.error("Erro no chat:", error);
    res.status(500).json({ 
      reply: "Ops! Algo deu errado. Pode tentar novamente? 🤔",
      sessionId: sessionId || generateSessionId()
    });
  }
}
