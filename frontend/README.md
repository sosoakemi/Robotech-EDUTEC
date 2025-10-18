# RoboTech Frontend

Interface do usuário do projeto RoboTech.

## 📁 Organização Sugerida

Mova os seguintes arquivos para esta pasta:

```
frontend/
├── public/          # Assets públicos e páginas
├── blog/            # Blog educacional
├── game/            # Jogo de memória
├── images.home/     # Imagens da home
├── index.html       # Página principal
└── styles.css       # Estilos globais
```

## 🎨 Estrutura de Páginas

- **Home** (`index.html`) - Página principal
- **Blog** (`blog/index.html`) - Artigos educacionais
- **Game** (`game/index.html`) - Jogo de memória educativo
- **Chatbot** (`public/chatbot.html`) - Chat com IA
- **Aulas** (`public/teste-aulas-Copia/`) - Plataforma de cursos

## 🔗 Integração com Backend

Para integrar com o sistema de login, adicione nas páginas:

```javascript
// Verificar se usuário está logado
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = '/login.html';
}

// Fazer requisição autenticada
fetch('http://localhost:5000/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log('Usuário:', data));
```

## 🚀 Como Usar

1. **Desenvolvimento Local:**
   - Abra `index.html` diretamente no navegador, ou
   - Use um servidor local: `python -m http.server 3000`

2. **Integrar com Backend:**
   - Backend deve estar rodando em `http://localhost:5000`
   - Configure CORS no backend (já configurado)

3. **Deploy:**
   - Vercel: Faz deploy automático do conteúdo
   - Configure a raiz do projeto ou use `public/` como diretório

## 📝 Próximas Funcionalidades

- [ ] Página de login
- [ ] Página de registro
- [ ] Dashboard do usuário
- [ ] Perfil de usuário
- [ ] Proteção de rotas (páginas que exigem login)

