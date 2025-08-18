# 🚀 Como usar o RoboTech Chatbot

## ✅ SOLUÇÃO PARA O ERRO DE CONEXÃO

### **Use o servidor de teste (RECOMENDADO):**

1. **Iniciar o servidor de teste:**
   ```bash
   cd chatbot
   node server-test.js
   ```

2. **Você deve ver:**
   ```
   ✅ Servidor de teste rodando em http://localhost:3000
   📝 Este servidor usa respostas pré-definidas para teste
   ```

3. **Abrir no navegador:**
   - Clique duas vezes no arquivo `index.html`
   - Ou use Live Server

4. **Testar o chatbot:**
   - Digite: "olá", "oi", "html", "css", "javascript", "python"
   - A IA responderá com respostas pré-definidas

## 🔧 Se quiser usar a IA real (Google Gemini):

1. **Obter chave da API:**
   - Acesse: https://makersuite.google.com/app/apikey
   - Crie uma nova chave

2. **Editar server.js:**
   - Substitua a linha: `const API_KEY = "sua_chave_aqui";`

3. **Usar servidor original:**
   ```bash
   node server.js
   ```

## ⚠️ Problemas comuns:

**"Erro ao conectar com o servidor"**
- Use `node server-test.js` (servidor de teste)
- Verifique se aparece a mensagem de sucesso

**"Live Server não funciona"**
- O Live Server só serve arquivos HTML/CSS/JS
- O chatbot precisa do servidor Node.js rodando

## 🎯 Teste rápido:
1. Abra o terminal
2. Digite: `cd chatbot`
3. Digite: `node server-test.js`
4. Abra `index.html` no navegador
5. Digite "olá" e veja a resposta!

## 📝 Palavras-chave para testar:
- "olá", "oi" → Saudação
- "html", "css", "javascript", "python" → Explicações
- "ajuda" → Lista de tecnologias
- "obrigado", "tchau" → Despedidas
