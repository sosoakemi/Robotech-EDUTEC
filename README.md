 <p align="center">
  <img width="171" height="120" alt="Ativo 8 1 (1)" src="https://github.com/user-attachments/assets/2ee32661-107f-43a4-8d0b-f95332c28ec3" />
</p> 
<h1>RoboTech</h1>



**RoboTech** é um site educacional desenvolvido por **Sophia Akemi, Sophia Santana, Luiz Henrique, Lara Freitas e Murillo Zanni**, com o objetivo de auxiliar programadores iniciantes a aprender, praticar e consolidar seus conhecimentos em programação de forma simples e acessível.

O projeto foi criado como parte da iniciativa **EDUTEC**, um programa de dois anos da escola **UNASP**, voltado para o desenvolvimento de soluções tecnológicas com foco educacional. Iniciamos o desenvolvimento do RoboTech em **2024**, quando estávamos no **primeiro ano do ensino médio**, e concluímos em **2025**, no **segundo ano**, colocando em prática tudo o que aprendemos ao longo desse período.

Durante esse processo, aplicamos conhecimentos em **HTML, CSS, JavaScript**, além de noções de **design, usabilidade, lógica de programação e trabalho em equipe**. O RoboTech representa não apenas o nosso crescimento técnico, mas também nosso comprometimento com a educação e a democratização do acesso ao conhecimento tecnológico.

## 🚀 Objetivos do RoboTech

- Ajudar estudantes e autodidatas a darem seus primeiros passos na programação;
- Fornecer exercícios práticos e conteúdos didáticos para reforçar o aprendizado;
- Criar uma comunidade de aprendizado colaborativo;
- Incentivar o uso da tecnologia como ferramenta de transformação educacional.

## 🛠️ Tecnologias Utilizadas
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **IA:** Google Generative AI (Gemini)
- **Estilização:** CSS Grid, Flexbox, Gradientes
- **Ícones:** Font Awesome
- Ferramentas de prototipagem e design (Figma, Canva, etc.)

## 👩‍💻 Equipe

- Sophia Akemi  
- Sophia Santana  
- Luiz Henrique  
- Lara Freitas  
- Murillo Zanni

---

## 🔐 Sistema de Autenticação Completo

O RoboTech agora possui um sistema completo de autenticação com backend próprio!

### ✨ Funcionalidades Implementadas

- ✅ **Registro de usuários** (estudante/professor)
- ✅ **Login com JWT** (tokens seguros)
- ✅ **Proteção de rotas** (Aulas, Game, Blog)
- ✅ **Atualização de perfil**
- ✅ **Alteração de senha**
- ✅ **Exclusão de conta**
- ✅ **Gerenciamento de sessões**

### 📦 Estrutura Técnica

**Frontend:**
- Modais de login/cadastro/recuperação
- Proteção de conteúdo
- Design responsivo
- JavaScript moderno

**Backend:**
- API RESTful completa
- MongoDB para armazenamento
- JWT para autenticação
- bcryptjs para criptografia
- Validações e segurança

## 🚀 Como Iniciar o Sistema Completo

### 1. Instalar MongoDB

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 2. Configurar e Iniciar Backend

```bash
cd backend
npm install
cp .env.example .env
# Edite o .env com suas configurações
npm run dev
```

**Backend rodando em:** http://localhost:5000

### 3. Iniciar Frontend

```bash
cd public
python -m http.server 3000
```

**Frontend rodando em:** http://localhost:3000

### 4. Testar!

1. Abra http://localhost:3000
2. Clique em "Entrar"
3. Crie sua conta
4. Explore o conteúdo!

## 📡 APIs Disponíveis

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/auth/register` | Registrar usuário | ❌ |
| POST | `/api/auth/login` | Login | ❌ |
| GET | `/api/auth/me` | Obter perfil | ✅ |
| PUT | `/api/auth/perfil` | Atualizar perfil | ✅ |
| PUT | `/api/auth/senha` | Alterar senha | ✅ |
| DELETE | `/api/auth/conta` | Deletar conta | ✅ |

## 📚 Documentação Completa

- **`INICIO-RAPIDO-BACKEND.md`** - Como iniciar backend em 5 minutos
- **`backend/GUIA-BACKEND.md`** - Documentação completa das APIs
- **`SISTEMA-LOGIN.md`** - Como funciona o sistema de login
- **`PROTECAO-ROTAS.md`** - Proteção de rotas frontend
- **`RESUMO-COMPLETO.md`** - Resumo de tudo implementado

## 🗄️ Banco de Dados (MongoDB)

```javascript
// Modelo de Usuário
{
  name: String,           // Nome completo
  email: String,          // Email (único)
  password: String,       // Senha criptografada
  role: String,           // student, teacher, admin
  avatar: String,         // Avatar (opcional)
  isActive: Boolean,      // Conta ativa
  createdAt: Date,        // Data de criação
  lastLogin: Date         // Último login
}
```

## 🔐 Segurança

- ✅ Senhas criptografadas (bcryptjs)
- ✅ Tokens JWT com expiração
- ✅ Proteção de rotas
- ✅ Validação de dados
- ✅ Email único
- ✅ CORS configurado

## 📝 Licença

MIT

---

**🚀 Sistema completo de autenticação implementado e funcionando!**


