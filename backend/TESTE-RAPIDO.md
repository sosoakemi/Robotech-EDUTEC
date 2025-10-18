# ⚡ TESTE RÁPIDO - Backend Funcionando!

## 🚀 Como Testar em 3 Passos

### Passo 1: Iniciar o Servidor

```bash
cd backend
npm run dev
```

Você vai ver:
```
🚀 Servidor rodando na porta 5000
📍 URL: http://localhost:5000
🌍 Ambiente: development
```

**Se der erro de porta em uso**, use:
```bash
lsof -ti:5000 | xargs kill -9
npm run dev
```

---

### Passo 2: Testar no Navegador

Abra no navegador:
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

✅ **Se viu isso, está funcionando!**

---

### Passo 3: Testar Registro de Usuário

**Opção 1: cURL (Terminal)**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@email.com","password":"senha123"}'
```

**Opção 2: No Frontend**
1. Abra outro terminal
2. `cd public`
3. `python -m http.server 3000`
4. Abra: http://localhost:3000
5. Clique em "Entrar"
6. Clique em "Não possui cadastro?"
7. Preencha e crie conta

---

## 📂 Ver Dados Salvos

```bash
cat backend/database.json
```

Você verá algo como:
```json
{
  "usuarios": [
    {
      "_id": "1234567890abc",
      "name": "Teste",
      "email": "teste@email.com",
      "password": "$2a$10$...",
      ...
    }
  ]
}
```

---

## ✅ Checklist de Teste

- [ ] Servidor iniciou sem erros
- [ ] `http://localhost:5000` mostra mensagem OK
- [ ] Registro de usuário funciona
- [ ] Dados aparecem em `database.json`
- [ ] Login funciona
- [ ] Frontend conecta com backend

---

## 🐛 Problemas Comuns

### Porta 5000 em uso
```bash
# Matar processo
lsof -ti:5000 | xargs kill -9

# Ou usar outra porta
PORT=5001 npm run dev
```

### Erro de permissão no database.json
```bash
chmod 666 database.json
```

### Módulos não instalados
```bash
rm -rf node_modules
npm install
```

---

## 🧪 Teste Completo com cURL

```bash
# 1. Health check
curl http://localhost:5000/health

# 2. Registrar
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"João","email":"joao@teste.com","password":"senha123"}'

# Copie o token da resposta

# 3. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@teste.com","password":"senha123"}'

# 4. Ver perfil (cole o token)
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## ✨ Está Funcionando Se:

✅ Servidor inicia na porta 5000  
✅ Navegador mostra mensagem de boas-vindas  
✅ Registro cria usuário  
✅ `database.json` tem dados  
✅ Login retorna token  
✅ Frontend consegue criar conta  

---

## 📞 Ainda com Problema?

1. **Feche TODOS os terminais** que possam estar rodando o servidor
2. **Mate todos processos na porta 5000**:
   ```bash
   lsof -ti:5000 | xargs kill -9
   ```
3. **Inicie limpo**:
   ```bash
   cd backend
   npm run dev
   ```

---

**PRONTO! Sistema funcionando! 🎉**

