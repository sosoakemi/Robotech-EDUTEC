# 🚀 GUIA COMPLETO DE DEPLOY NA VERCEL

## 📋 PASSO A PASSO PARA DEPLOY

### ✅ **1. PREPARAR O PROJETO**

#### Arquivos Necessários (JÁ CRIADOS):
- ✅ `api/chat.js` - Função serverless do chatbot
- ✅ `vercel.json` - Configuração da Vercel
- ✅ `package.json` - Dependências do projeto
- ✅ `.gitignore` - Arquivos a ignorar no Git

---

### ✅ **2. CRIAR CONTA NA VERCEL**

1. Acesse: https://vercel.com
2. Clique em "Sign Up"
3. Escolha "Continue with GitHub" (recomendado)
4. Autorize a Vercel a acessar seus repositórios

---

### ✅ **3. SUBIR PROJETO NO GITHUB**

#### Opção A: Usar GitHub Desktop (Mais Fácil)
1. Baixe e instale: https://desktop.github.com/
2. Abra o GitHub Desktop
3. Clique em "File" > "Add Local Repository"
4. Selecione a pasta: `RoboTech-Project`
5. Clique em "Create Repository"
6. Escreva uma mensagem: "Deploy inicial RoboTech"
7. Clique em "Commit to main"
8. Clique em "Publish repository"
9. Marque a opção "Public" (ou "Private" se preferir)
10. Clique em "Publish Repository"

#### Opção B: Usar Terminal
```bash
cd /Users/sophiaakemi/Downloads/RoboTech-Project

# Inicializar Git (se ainda não fez)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Deploy inicial RoboTech"

# Criar repositório no GitHub
# 1. Vá em https://github.com/new
# 2. Nome: RoboTech-Project
# 3. Clique em "Create repository"

# Conectar ao GitHub (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/RoboTech-Project.git
git branch -M main
git push -u origin main
```

---

### ✅ **4. FAZER DEPLOY NA VERCEL**

#### 4.1. Importar Projeto:
1. Acesse: https://vercel.com/dashboard
2. Clique em "Add New..." > "Project"
3. Procure o repositório "RoboTech-Project"
4. Clique em "Import"

#### 4.2. Configurar o Projeto:
- **Framework Preset:** Other (deixe vazio)
- **Root Directory:** `./` (raiz do projeto)
- **Build Command:** Deixe vazio ou `echo "Build completed"`
- **Output Directory:** `public`

#### 4.3. **IMPORTANTE - Adicionar Variável de Ambiente:**

**🔑 SUA CHAVE DA API:**
```
AIzaSyC91Fz67XpWmuyPJqyDD1tn0vAD2Na06PM
```

**Passos:**
1. Na tela de configuração, procure "Environment Variables"
2. Clique em "Add Environment Variable"
3. **Name:** `GEMINI_API_KEY`
4. **Value:** `AIzaSyC91Fz67XpWmuyPJqyDD1tn0vAD2Na06PM`
5. **Environment:** Marque todas (Production, Preview, Development)
6. Clique em "Add"

#### 4.4. Fazer Deploy:
1. Clique em "Deploy"
2. Aguarde o deploy finalizar (1-3 minutos)
3. Quando aparecer "Congratulations! 🎉", o deploy foi concluído

---

### ✅ **5. ACESSAR O SITE**

Após o deploy, você receberá uma URL como:
```
https://robotech-project.vercel.app
```

Ou se escolheu outro nome:
```
https://seu-projeto-nome.vercel.app
```

---

### ✅ **6. TESTAR O CHATBOT**

1. Acesse seu site na Vercel
2. Vá para a página com o chatbot
3. Digite uma mensagem: "Olá, como você funciona?"
4. O chatbot deve responder usando a API do Gemini

**Se não funcionar:**
- Verifique se a variável `GEMINI_API_KEY` foi adicionada
- Abra o Console do navegador (F12) e veja se há erros
- Verifique os logs na Vercel Dashboard > seu projeto > Functions

---

### ✅ **7. CONFIGURAR DOMÍNIO PERSONALIZADO (OPCIONAL)**

1. Na Vercel Dashboard, clique no seu projeto
2. Vá em "Settings" > "Domains"
3. Clique em "Add"
4. Digite seu domínio (ex: `robotech.com.br`)
5. Siga as instruções para configurar DNS

---

## 🔧 SOLUÇÃO DE PROBLEMAS

### ❌ **Erro: "GEMINI_API_KEY não configurada"**

**Solução:**
1. Vá em: Vercel Dashboard > Seu Projeto > Settings
2. Clique em "Environment Variables"
3. Adicione: `GEMINI_API_KEY` = `AIzaSyC91Fz67XpWmuyPJqyDD1tn0vAD2Na06PM`
4. Clique em "Save"
5. Vá em "Deployments" e clique em "Redeploy"

### ❌ **Erro: "Failed to load resource"**

**Solução:**
1. Abra o Console (F12)
2. Veja qual URL está sendo chamada
3. Deve ser: `https://seu-site.vercel.app/chat`
4. Se estiver chamando `localhost`, limpe o cache do navegador

### ❌ **Erro: "Function timeout"**

**Solução:**
- A função já está configurada para 30 segundos no `vercel.json`
- Se ainda der timeout, a API do Gemini pode estar lenta
- Tente novamente

### ❌ **Chatbot não responde**

**Verificações:**
1. Abra F12 > Console
2. Veja se há erros JavaScript
3. Vá em F12 > Network
4. Envie uma mensagem
5. Veja a requisição para `/chat`
6. Verifique se retorna status 200
7. Se retornar erro 500, veja os logs na Vercel

---

## 📱 ATUALIZAR O SITE APÓS MUDANÇAS

### Quando você fizer alterações no código:

#### Opção A: GitHub Desktop
1. Abra o GitHub Desktop
2. Verá as alterações listadas
3. Escreva uma mensagem descrevendo as mudanças
4. Clique em "Commit to main"
5. Clique em "Push origin"
6. A Vercel fará deploy automático em 1-2 minutos

#### Opção B: Terminal
```bash
cd /Users/sophiaakemi/Downloads/RoboTech-Project

# Adicionar mudanças
git add .

# Fazer commit
git commit -m "Descrição das mudanças"

# Enviar para GitHub
git push

# Deploy automático na Vercel!
```

---

## 🎯 CHECKLIST FINAL

Antes de fazer deploy, certifique-se:

- [ ] ✅ Conta criada na Vercel
- [ ] ✅ Repositório criado no GitHub
- [ ] ✅ Código enviado para o GitHub
- [ ] ✅ Projeto importado na Vercel
- [ ] ✅ Variável `GEMINI_API_KEY` configurada
- [ ] ✅ Deploy realizado com sucesso
- [ ] ✅ Site acessível pela URL da Vercel
- [ ] ✅ Chatbot funcionando corretamente

---

## 🔑 SUA CHAVE DA API (IMPORTANTE)

```
GEMINI_API_KEY=AIzaSyC91Fz67XpWmuyPJqyDD1tn0vAD2Na06PM
```

**⚠️ IMPORTANTE:**
- ✅ Já está configurada no código local
- ✅ Adicione na Vercel nas Environment Variables
- ❌ NUNCA compartilhe esta chave publicamente
- ❌ NUNCA faça commit da chave no GitHub

---

## 📞 LINKS ÚTEIS

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Documentação Vercel:** https://vercel.com/docs
- **GitHub:** https://github.com
- **Google AI Studio:** https://aistudio.google.com

---

## ✅ TUDO PRONTO!

Seu chatbot está configurado para funcionar na Vercel!

**Próximos passos:**
1. Suba o código no GitHub
2. Importe na Vercel
3. Adicione a variável `GEMINI_API_KEY`
4. Faça o deploy
5. Teste o chatbot

**Qualquer dúvida, consulte este guia!** 🚀
