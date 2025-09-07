# Deploy do RoboTech no Vercel

## ✅ Chat Funcionando no Vercel

O chat já está **100% configurado** para funcionar no Vercel! 🎉

### 📋 Pré-requisitos

1. **Conta no Vercel**: [vercel.com](https://vercel.com)
2. **Chave da API do Gemini**: Obtenha em [Google AI Studio](https://makersuite.google.com/app/apikey)

### 🚀 Como fazer o Deploy

#### Passo 1: Configurar variável de ambiente
```bash
# No painel do Vercel, vá em:
# Project Settings > Environment Variables

# Adicione:
GEMINI_API_KEY=your_api_key_here
```

#### Passo 2: Fazer o deploy
```bash
# Instalar Vercel CLI (opcional)
npm install -g vercel

# Fazer login
vercel login

# Deploy do projeto
vercel

# Ou simplesmente faça upload no GitHub e conecte ao Vercel
```

### 🔧 Arquivos de Configuração

O projeto já tem tudo configurado:

- ✅ **API Route**: `api/chat.js` - Funciona automaticamente no Vercel
- ✅ **Configuração**: `public/config.js` - Detecta automaticamente produção/desenvolvimento
- ✅ **Chat Interface**: `public/chatbot.html` - Funciona tanto local quanto no Vercel

### 🌐 URLs após o Deploy

Após o deploy, você terá:

- **Site Principal**: `https://seu-projeto.vercel.app`
- **Chat**: `https://seu-projeto.vercel.app/chatbot.html`
- **API**: `https://seu-projeto.vercel.app/api/chat`

### 📝 Como usar o Chat no Vercel

1. Acesse: `https://seu-projeto.vercel.app/chatbot.html`
2. Digite sua pergunta
3. O chat responderá automaticamente usando a API do Gemini

### 🔍 Verificação

Para verificar se está funcionando:

```bash
# Teste a API diretamente
curl -X POST https://seu-projeto.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Olá, teste"}'
```

### 🎨 Mudanças Realizadas

- ✅ **Ícones removidos**: Substituídos por ícones do FontAwesome
- ✅ **API configurada**: Funciona tanto local quanto no Vercel
- ✅ **Configuração automática**: Detecta ambiente automaticamente
- ✅ **Sem dependências externas**: Tudo integrado

### 🆘 Problemas Comuns

#### Chat não funciona:
1. Verifique se a variável `GEMINI_API_KEY` está configurada no Vercel
2. Certifique-se de que a chave da API é válida
3. Verifique os logs do Vercel para erros

#### Ícones não aparecem:
- Os ícones agora usam FontAwesome (já incluído no HTML)
- Se não aparecerem, verifique se o CSS está carregando

---

**🎯 Resultado**: Seu chat funcionará perfeitamente no Vercel sem precisar de servidor local!
