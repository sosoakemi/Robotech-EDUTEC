# RoboTech Backend

Backend do projeto RoboTech com sistema de autenticação e APIs.

## 🚀 Tecnologias

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- bcryptjs (criptografia de senhas)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar o arquivo .env com suas configurações
```

## ⚙️ Configuração

Edite o arquivo `.env` com suas configurações:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/robotech
JWT_SECRET=seu_jwt_secret_super_secreto
GEMINI_API_KEY=sua_chave_api_gemini
FRONTEND_URL=http://localhost:3000
```

## 🏃 Como executar

```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start
```

## 📚 Estrutura de Pastas

```
backend/
├── config/          # Configurações (database, etc)
├── controllers/     # Controladores das rotas
├── middleware/      # Middlewares (autenticação, etc)
├── models/          # Modelos do MongoDB
├── routes/          # Definição de rotas
├── api/             # APIs serverless (Vercel)
├── .env.example     # Exemplo de variáveis de ambiente
├── server.js        # Arquivo principal do servidor
└── package.json
```

## 🔐 Rotas de Autenticação

### Registrar usuário
```
POST /api/auth/register
Body: { "name": "Nome", "email": "email@example.com", "password": "senha123" }
```

### Login
```
POST /api/auth/login
Body: { "email": "email@example.com", "password": "senha123" }
```

### Obter dados do usuário logado
```
GET /api/auth/me
Headers: { "Authorization": "Bearer TOKEN" }
```

### Logout
```
POST /api/auth/logout
Headers: { "Authorization": "Bearer TOKEN" }
```

## 👥 Roles de Usuário

- `student` - Estudante (padrão)
- `teacher` - Professor
- `admin` - Administrador

## 🔒 Middleware de Autenticação

Use o middleware `protect` para proteger rotas:

```javascript
const { protect } = require('./middleware/auth');
router.get('/rota-protegida', protect, controller);
```

Use `authorize` para restringir por role:

```javascript
const { protect, authorize } = require('./middleware/auth');
router.get('/admin', protect, authorize('admin'), controller);
```

