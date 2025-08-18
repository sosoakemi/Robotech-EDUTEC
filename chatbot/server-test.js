import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Respostas de teste para o chatbot
const testResponses = {
  "olá": "Olá! Como posso ajudá-lo hoje?",
  "oi": "Oi! Tudo bem? Estou aqui para ajudar!",
  "html": "HTML é a Linguagem de Marcação de Hipertexto, usada para estruturar conteúdo na web.",
  "css": "CSS é usado para estilizar e formatar páginas web.",
  "javascript": "JavaScript é uma linguagem de programação para tornar sites interativos.",
  "python": "Python é uma linguagem de programação versátil e fácil de aprender.",
  "ajuda": "Posso ajudar com HTML, CSS, JavaScript, Python e outras tecnologias web!",
  "obrigado": "De nada! Estou sempre aqui para ajudar! 😊",
  "tchau": "Até logo! Foi um prazer conversar com você! 👋"
};

// Função para encontrar resposta mais adequada
function findResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  for (const [key, response] of Object.entries(testResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  // Resposta padrão
  return "Interessante! Posso ajudar com programação, HTML, CSS, JavaScript, Python e muito mais. O que você gostaria de saber?";
}

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "RoboTech Chatbot Server está funcionando! 🚀" });
});

// Rota para o chatbot
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("Mensagem recebida:", userMessage);
    
    const reply = findResponse(userMessage);
    console.log("Resposta:", reply);
    
    res.json({ reply });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro ao processar a mensagem" });
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor de teste rodando em http://localhost:${PORT}`);
  console.log("📝 Este servidor usa respostas pré-definidas para teste");
});
