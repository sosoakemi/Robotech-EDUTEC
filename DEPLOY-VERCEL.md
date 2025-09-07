# 🚀 Deploy RoboTech no Vercel

## ✅ **Configuração Completa**

O projeto está **100% configurado** para funcionar no Vercel! 

### 📁 **Estrutura do Projeto**
```
RoboTech-Project/
├── index.html                    # Página principal
├── styles.css                    # Estilos da home
├── package.json                  # Dependências do projeto
├── vercel.json                   # Configuração do Vercel
├── game/                         # Página do jogo
├── blog/                         # Página do blog
└── teste-aulas - Copia/          # Página de aulas + Chatbot
    ├── index.html
    ├── chatbot.html
    ├── config.js
    └── api/
        └── chat.js               # API do chatbot
```

---

## 🚀 **Deploy no Vercel**

### **Opção 1: Deploy via GitHub (Recomendado)**

1. **Fazer commit e push**:
   ```bash
   git add .
   git commit -m "RoboTech pronto para Vercel"
   git push origin main
   ```

2. **No Vercel**:
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe seu repositório GitHub
   - **Configure variável de ambiente**:
     ```
     GEMINI_API_KEY=AIzaSyDi3aQ8UTOobPkceJ4pcy1B7x1yzm96XQ4
     ```
   - Clique em "Deploy"

### **Opção 2: Deploy via Vercel CLI**

1. **Instalar Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

---

## ⚙️ **Configurações Importantes**

### **1. Variável de Ambiente**
**OBRIGATÓRIO**: Adicione no painel do Vercel:
```
GEMINI_API_KEY=AIzaSyDi3aQ8UTOobPkceJ4pcy1B7x1yzm96XQ4
```

### **2. vercel.json**
```json
{
  "functions": {
    "teste-aulas - Copia/api/chat.js": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/chat",
      "destination": "/teste-aulas - Copia/api/chat"
    }
  ]
}
```

### **3. API Endpoint**
- **URL da API**: `/chat`
- **Método**: POST
- **Timeout**: 30 segundos
- **CORS**: Configurado automaticamente

---

## 🧪 **Teste do Deploy**

### **1. Verificar se funcionou**:
- Acesse: `https://seu-projeto.vercel.app/`
- Navegue para: `https://seu-projeto.vercel.app/teste-aulas%20-%20Copia/`
- Clique no chatbot (ícone no canto inferior esquerdo)
- Digite uma mensagem

### **2. URLs de acesso**:
- **Home**: `https://seu-projeto.vercel.app/`
- **Aulas**: `https://seu-projeto.vercel.app/teste-aulas%20-%20Copia/`
- **Game**: `https://seu-projeto.vercel.app/game/`
- **Blog**: `https://seu-projeto.vercel.app/blog/`

---

## 🔧 **Funcionalidades**

### ✅ **Header Funcionando**
- Navegação entre todas as páginas
- Design responsivo
- Z-index configurado corretamente

### ✅ **Chatbot Funcionando**
- IA Gemini integrada
- Respostas inteligentes
- Histórico de conversa
- Interface moderna
- **Sem necessidade de servidor local**

### ✅ **Responsivo**
- Desktop, tablet e mobile
- Design adaptativo
- Performance otimizada

---

## 🚨 **Troubleshooting**

### **Erro: "Failed to fetch"**
1. Verifique se `GEMINI_API_KEY` está configurada
2. Verifique se o deploy foi concluído
3. Aguarde alguns minutos para propagação

### **Erro: "Function not found"**
1. Verifique se `vercel.json` está na raiz
2. Verifique se `api/chat.js` está no local correto
3. Faça novo deploy

### **Chatbot não responde**
1. Verifique o console do navegador (F12)
2. Teste a URL: `https://seu-projeto.vercel.app/chat`
3. Verifique logs no painel do Vercel

---

## 📊 **Monitoramento**

### **No painel do Vercel**:
- **Functions**: Monitore uso da API
- **Analytics**: Veja estatísticas de acesso
- **Logs**: Verifique erros em tempo real

### **Console do navegador**:
- Abra F12
- Verifique se não há erros
- Confirme que a API está sendo chamada

---

## 🎯 **Próximos Passos**

1. **Deploy**: Siga as instruções acima
2. **Teste**: Verifique todas as funcionalidades
3. **Customizar**: Configure domínio personalizado
4. **Monitorar**: Acompanhe performance e uso

---

## 🎉 **Resultado Final**

Após o deploy, você terá:
- ✅ Site funcionando no Vercel
- ✅ Chatbot com IA funcionando
- ✅ Navegação entre páginas
- ✅ Design responsivo
- ✅ Sem necessidade de servidor local

**🚀 Seu RoboTech estará online e funcionando perfeitamente!**
