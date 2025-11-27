import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// ES Modules: obter __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const API_KEY = "AIzaSyDi3aQ8UTOobPkceJ4pcy1B7x1yzm96XQ4";
const genAI = new GoogleGenerativeAI(API_KEY);

// Configuração melhorada do modelo com parâmetros específicos
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.9, // Mais criativo e natural (aumentado)
    topK: 50, // Mais diversidade
    topP: 0.98, // Mais criatividade
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

// Armazenar histórico de conversas por sessão
const conversationHistory = new Map();

app.get("/", (req, res) => {
  res.json({ message: "RoboTech Chatbot Server está funcionando! 🚀" });
});

// Prompt personalizado para respostas mais naturais
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

// Rota para o chatbot
app.post("/chat", async (req, res) => {
  const { message, sessionId } = req.body;
  
  try {
    // Gerar ou usar sessionId existente
    const currentSessionId = sessionId || generateSessionId();
    
    // Obter histórico da conversa
    let history = conversationHistory.get(currentSessionId) || [];
    
    // Construir o prompt com histórico
    let fullPrompt = SYSTEM_PROMPT + "\n\n";
    
    // Adicionar histórico recente (últimas 6 mensagens para manter contexto)
    if (history.length > 0) {
      fullPrompt += "Histórico da conversa:\n";
      const recentHistory = history.slice(-6);
      recentHistory.forEach(entry => {
        fullPrompt += `${entry.role}: ${entry.content}\n`;
      });
      fullPrompt += "\n";
    }
    
    // Adicionar a mensagem atual com instrução específica
    fullPrompt += `Usuário: ${message}\n\nIMPORTANTE: Responda diretamente à pergunta do usuário. NÃO use saudações genéricas, NÃO pergunte como pode ajudar, NÃO use frases prontas. Seja direto e natural.\n\nRoboTech:`;
    
    // Gerar resposta
    const result = await model.generateContent(fullPrompt);
    const reply = result?.response?.text() || "Desculpe, não consegui processar sua pergunta. Pode tentar novamente?";
    
    // Atualizar histórico
    history.push(
      { role: "Usuário", content: message },
      { role: "RoboTech", content: reply }
    );
    
    // Manter apenas as últimas 10 interações para não sobrecarregar
    if (history.length > 20) {
      history = history.slice(-20);
    }
    
    conversationHistory.set(currentSessionId, history);
    
    res.json({ 
      reply: reply.trim(),
      sessionId: currentSessionId 
    });
    
  } catch (error) {
    console.error("Erro no chat:", error);
    res.json({ 
      reply: "Ops! Algo deu errado. Pode tentar novamente? 🤔",
      sessionId: sessionId || generateSessionId()
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});

