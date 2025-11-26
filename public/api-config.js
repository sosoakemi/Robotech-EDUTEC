// Configuração de API - Detecta ambiente automaticamente
(function() {
  'use strict';
  
  function isProduction() {
    if (typeof window === 'undefined' || !window.location) {
      return true; // Assume produção se não houver window
    }
    const hostname = window.location.hostname;
    // Se não for localhost, é produção
    const isLocal = hostname === 'localhost' || 
                    hostname === '127.0.0.1' ||
                    hostname.includes('localhost') ||
                    hostname.includes('127.0.0.1');
    return !isLocal;
  }

  function getApiUrl() {
    // Em produção (Vercel), o backend não está disponível
    // Retorna vazio para desabilitar funcionalidades que dependem do backend
    if (isProduction()) {
      return '';
    }
    // Em desenvolvimento, usa o backend local
    return 'http://localhost:5001';
  }

  // Expõe a configuração globalmente IMEDIATAMENTE
  if (typeof window !== 'undefined') {
    window.APIConfig = {
      isProduction: isProduction,
      getApiUrl: getApiUrl,
      API_URL: getApiUrl()
    };
    
    // Debug (apenas em desenvolvimento)
    if (!isProduction()) {
      console.log('[APIConfig] Ambiente: Desenvolvimento');
      console.log('[APIConfig] API_URL:', window.APIConfig.API_URL);
    } else {
      console.log('[APIConfig] Ambiente: Produção - Backend desabilitado');
    }
  }
})();