import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔑 sua chave da API Gemini
const API_KEY = "AIzaSyC91Fz67XpWmuyPJqyDD1tn0vAD2Na06PM";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "RoboTech Chatbot Server está funcionando! 🚀" });
});

// Rota para o chatbot
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const result = await model.generateContent(userMessage);

    // Extrair a resposta corretamente
    let reply = "";
    if (result.response?.candidates?.length > 0) {
      reply = result.response.candidates[0].content.parts[0].text || "";
    }

    console.log("Resposta do Gemini:", reply); // <-- Para ver no terminal
    res.json({ reply });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro ao processar a mensagem" });
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});

