// Configuração do RoboTech Chatbot
const CONFIG = {
    // URLs da API
    API_URLS: {
        development: 'http://localhost:5001/chat',
        production: '/chat'
    },
    
   
    CHATBOT: {
        maxRetries: 3,
        timeout: 30000,
        typingDelay: 1000
    },
    
 
    isProduction: () => {
        return window.location.hostname !== 'localhost' && 
               window.location.hostname !== '127.0.0.1' &&
               !window.location.hostname.includes('localhost') &&
               !window.location.hostname.includes('127.0.0.1');
    },
    
   
    getApiUrl: () => {
        return CONFIG.isProduction() ? 
               CONFIG.API_URLS.production : 
               CONFIG.API_URLS.development;
    }
};


window.RoboTechConfig = CONFIG;


console.log('RoboTech Config carregado:', CONFIG);
console.log('Ambiente:', CONFIG.isProduction() ? 'Produção' : 'Desenvolvimento');
console.log('URL da API:', CONFIG.getApiUrl());

