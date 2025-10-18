# 🚀 Como Usar o Backend - SUPER SIMPLES!

## ⚡ NÃO PRECISA INSTALAR NADA!

Não precisa de MongoDB, MySQL, PostgreSQL ou qualquer banco de dados!  
Tudo é salvo em um arquivo JSON local: `database.json`

---

## 📋 Passo a Passo

### 1. Instalar Dependências

```bash
cd backend
npm install
```

Isso vai instalar apenas:
- Express (servidor)
- JWT (autenticação)
- bcryptjs (criptografia de senhas)
- cors (permitir requisições)

**Sem banco de dados! 🎉**

---

### 2. Configurar (Opcional)

Crie um arquivo `.env` (opcional, não é obrigatório):

```bash
PORT=5000
JWT_SECRET=minha-senha-super-secreta
FRONTEND_URL=http://localhost:3000
```

Se não criar, funciona com as configurações padrão! ✅

---

### 3. Iniciar o Servidor

```bash
npm run dev
```

Você verá:
```
🚀 Servidor rodando na porta 5000
📍 URL: http://localhost:5000
```

**PRONTO! Já está funcionando!** 🎉

---

## 📝 Como Funciona

### Onde os Dados São Salvos?

Tudo é salvo no arquivo `database.json`:

```json
{
  "usuarios": [
    {
      "_id": "1234567890abc",
      "name": "João Silva",
      "email": "joao@email.com",
      "password": "$2a$10$...",
      "role": "student",
      "avatar": null,
      "isActive": true,
      "createdAt": "2024-03-15T10:00:00.000Z",
      "lastLogin": "2024-03-15T14:30:00.000Z"
    }
  ]
}
```

- ✅ Arquivo JSON simples
- ✅ Você pode abrir e ver os dados
- ✅ Senhas são criptografadas
- ✅ Salva automaticamente

---

## 🧪 Testar

### No Navegador
```
http://localhost:5000
```

Deve mostrar:
```json
{
  "message": "RoboTech API - Backend funcionando! ✅",
  "version": "2.0.0 - JSON Local",
  "database": "Arquivo JSON local"
}
```

### Registrar Usuário
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@email.com","password":"senha123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","password":"senha123"}'
```

---

## 📂 Estrutura de Arquivos

```
backend/
├── database.json          ← AQUI FICAM OS DADOS!
├── db.js                  ← Funções para ler/escrever JSON
├── server.js              ← Servidor Express
├── controllers/
│   └── authController.js  ← Lógica de login/cadastro
├── middleware/
│   └── auth.js            ← Proteção de rotas
├── routes/
│   └── auth.js            ← Rotas da API
└── package.json
```

---

## 🎯 Todas as APIs

| Rota | Método | O que faz |
|------|--------|-----------|
| `/api/auth/register` | POST | Criar conta |
| `/api/auth/login` | POST | Fazer login |
| `/api/auth/me` | GET | Ver perfil |
| `/api/auth/perfil` | PUT | Atualizar perfil |
| `/api/auth/senha` | PUT | Mudar senha |
| `/api/auth/conta` | DELETE | Deletar conta |

---

## 📊 Ver os Dados Salvos

### Opção 1: Abrir o arquivo
```bash
cat database.json
```

### Opção 2: Usar editor
```bash
code database.json
# ou
nano database.json
```

### Opção 3: Com Node.js
```bash
node -e "console.log(JSON.stringify(require('./database.json'), null, 2))"
```

---

## 🗑️ Limpar Todos os Dados

```bash
# Apagar todos os usuários
echo '{"usuarios":[]}' > database.json
```

Ou delete manualmente os usuários no arquivo!

---

## ✅ Vantagens

- ✅ **Super simples** - apenas um arquivo JSON
- ✅ **Sem instalação** - não precisa de banco de dados
- ✅ **Portátil** - copie o arquivo, copie os dados
- ✅ **Fácil debug** - abra e veja os dados
- ✅ **Funciona offline** - tudo local
- ✅ **Rápido** - sem conexão de rede com DB
- ✅ **Zero configuração** - já funciona

---

## ⚠️ Limitações

- ❌ Não use para muitos usuários (até ~1000 OK)
- ❌ Não use para produção grande
- ❌ Backup manual (copie o arquivo)

**Para estudos e projetos pequenos: PERFEITO! ✅**

---

## 🚀 Resumo Rápido

```bash
# 1. Instalar
cd backend
npm install

# 2. Iniciar
npm run dev

# 3. Testar
# Abra: http://localhost:5000

# Pronto! ✅
```

---

## 🔧 Troubleshooting

### Erro: Porta em uso
```bash
lsof -ti:5000 | xargs kill -9
# ou mude a porta no .env
PORT=5001
```

### Ver dados salvos
```bash
cat backend/database.json
```

### Resetar dados
```bash
echo '{"usuarios":[]}' > backend/database.json
```

### Backup
```bash
cp database.json database-backup.json
```

---

## 🎉 Pronto!

**Sistema completo funcionando SEM banco de dados! 🚀**

- Dados salvos em: `database.json`
- Servidor: `http://localhost:5000`
- APIs: `http://localhost:5000/api/auth/*`

**Simples, rápido e funcional!** ✅

