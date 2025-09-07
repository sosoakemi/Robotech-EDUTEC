# 🚀 Deploy no Vercel - RoboTech Chatbot

## ✅ **Configuração Completa para Vercel**

Seu chatbot agora está configurado para funcionar no Vercel! 

### 📁 **Arquivos Criados/Modificados:**

1. **`vercel.json`** - Configuração do Vercel
2. **`api/chat.js`** - Função serverless para o chatbot
3. **`chatbot.html`** - Atualizado para detectar produção/desenvolvimento
4. **`main.js`** - Ícone do botão alterado para `chaticon.png`

### 🎯 **Como Fazer Deploy:**

1. **Instalar Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Fazer Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Deploy de Produção:**
   ```bash
   vercel --prod
   ```

### 🔧 **Como Funciona:**

- **Desenvolvimento:** Usa `http://localhost:3000/chat`
- **Produção (Vercel):** Usa `/chat` (Vercel Function)
- **Detecção Automática:** O código detecta automaticamente o ambiente

### 🎨 **Mudanças Visuais:**

- ✅ Logo das respostas: `chaticon.png`
- ✅ Ícone do botão flutuante: `chaticon.png`
- ✅ Chatbot sem mensagens prontas
- ✅ Respostas naturais e diretas

### 🚨 **Importante:**

- Sua API key do Gemini está no código (considere usar variáveis de ambiente)
- O Vercel Function tem timeout de 30 segundos
- Funciona tanto local quanto em produção

### 🔑 **Variáveis de Ambiente (Opcional):**

No Vercel, você pode adicionar:
- `GEMINI_API_KEY` = sua chave da API

E modificar o `api/chat.js` para usar:
```javascript
const API_KEY = process.env.GEMINI_API_KEY || "sua-chave-aqui";
```

## 🎉 **Pronto para Deploy!**
