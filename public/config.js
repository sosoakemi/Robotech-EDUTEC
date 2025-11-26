// Configuração de API - Detecta ambiente automaticamente
(function() {
  'use strict';
  
  function isProduction() {
    if (typeof window === 'undefined' || !window.location) {
      return true;
    }
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || 
                    hostname === '127.0.0.1' ||
                    hostname.includes('localhost');
    return !isLocal;
  }

  function getApiUrl() {
    // Em produção (Vercel), usa a URL do seu backend hospedado
    if (isProduction()) {
      return 'https://backend-six-rho-46.vercel.app';
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
    
    // Debug para confirmar qual URL está sendo usada
    console.log('[APIConfig] API URL ativa:', window.APIConfig.API_URL);
  }
})();