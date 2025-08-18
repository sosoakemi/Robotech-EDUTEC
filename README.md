# 🤖 RoboTech Project

Um projeto completo de chatbot inteligente com interface moderna e integração com IA.

## 📁 Estrutura do Projeto

```
RoboTech-Project/
├── chatbot/                 # Chatbot com IA
│   ├── index.html          # Interface do chat
│   ├── styles.css          # Estilos CSS
│   ├── server.js           # Servidor com Google Gemini
│   ├── server-test.js      # Servidor de teste (sem API)
│   ├── package.json        # Dependências
│   ├── COMO_USAR.md        # Instruções de uso
│   └── imagesChat/         # Imagens do chat
├── images.home/            # Imagens da página inicial
├── index.html              # Página inicial
├── styles.css              # Estilos da página inicial
└── README.md               # Este arquivo
```

## 🚀 Funcionalidades

### Chatbot Inteligente
- 💬 Interface de chat moderna e responsiva
- 🤖 Integração com Google Gemini AI
- 🎨 Design com gradientes e animações
- 📱 Totalmente responsivo
- ⚡ Indicador de digitação
- 🔄 Mensagens em tempo real

### Página Inicial
- 🏠 Landing page moderna
- 🎯 Seções informativas
- 📱 Design responsivo
- 🎨 Interface elegante

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **IA:** Google Generative AI (Gemini)
- **Estilização:** CSS Grid, Flexbox, Gradientes
- **Ícones:** Font Awesome

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado
- Chave da API do Google Gemini (opcional)

### Passos

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/RoboTech-Project.git
   cd RoboTech-Project
   ```

2. **Instale as dependências:**
   ```bash
   cd chatbot
   npm install
   ```

3. **Configure a API (opcional):**
   - Obtenha uma chave em https://makersuite.google.com/app/apikey
   - Edite `chatbot/server.js` e substitua a API_KEY

4. **Execute o servidor:**
   ```bash
   # Para usar IA real (requer API key):
   node server.js
   
   # Para teste (sem API key):
   node server-test.js
   ```

5. **Abra no navegador:**
   - Chatbot: `chatbot/index.html`
   - Página inicial: `index.html`

## 📖 Documentação

- **Chatbot:** Veja `chatbot/COMO_USAR.md` para instruções detalhadas
- **API:** Documentação da Google Gemini em https://ai.google.dev/

## 🎨 Características do Design

- **Tema Escuro:** Interface moderna com gradientes
- **Responsivo:** Funciona em desktop, tablet e mobile
- **Animações:** Transições suaves e efeitos hover
- **Acessibilidade:** Design inclusivo e navegável

## 🔧 Configuração

### Variáveis de Ambiente
```bash
# Para usar IA real, configure no server.js:
const API_KEY = "sua_chave_aqui";
```

### Personalização
- Cores: Edite as variáveis CSS em `styles.css`
- Imagens: Substitua arquivos em `imagesChat/` e `images.home/`
- Textos: Modifique os textos nos arquivos HTML

## 📝 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no GitHub.

---

Desenvolvido com ❤️ para demonstrar habilidades em desenvolvimento web e IA.

