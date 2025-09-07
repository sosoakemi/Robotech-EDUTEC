// Configuração do RoboTech Chatbot
const CONFIG = {
    // URLs da API
    API_URLS: {
        development: 'http://localhost:3000/chat',
        production: '/chat'
    },
    
    // Configurações do chatbot
    CHATBOT: {
        maxRetries: 3,
        timeout: 30000,
        typingDelay: 1000
    },
    
    // Detectar ambiente
    isProduction: () => {
        return window.location.hostname !== 'localhost' && 
               window.location.hostname !== '127.0.0.1' &&
               !window.location.hostname.includes('localhost') &&
               !window.location.hostname.includes('127.0.0.1');
    },
    
    // Obter URL da API baseada no ambiente
    getApiUrl: () => {
        return CONFIG.isProduction() ? 
               CONFIG.API_URLS.production : 
               CONFIG.API_URLS.development;
    }
};

// Exportar para uso global
window.RoboTechConfig = CONFIG;

// Debug: verificar se a configuração está funcionando
console.log('RoboTech Config carregado:', CONFIG);
console.log('Ambiente:', CONFIG.isProduction() ? 'Produção' : 'Desenvolvimento');
console.log('URL da API:', CONFIG.getApiUrl());

