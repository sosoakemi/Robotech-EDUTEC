// Configuração de API - Detecta ambiente automaticamente e permite override em produção
(function() {
  'use strict';

  const DEFAULT_DEV_API_URL = 'https://backend-edutec.onrender.com';
  const DEFAULT_PROD_API_URL = 'https://backend-edutec.onrender.com';

  function isProduction() {
    if (typeof window === 'undefined' || !window.location) {
      return true; // Assume produção se não houver window
    }
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' ||
                    hostname === '127.0.0.1' ||
                    hostname.includes('localhost') ||
                    hostname.includes('127.0.0.1');
    return !isLocal;
  }

  function resolveProdApiUrl() {
    // Prioridade:
    // 1) window.__API_URL__ definido no HTML
    // 2) <meta name="backend-api-url" content="https://seu-backend.vercel.app/api">
    // 3) DEFAULT_PROD_API_URL (vazio por padrão para evitar chamadas inválidas)
    try {
      if (typeof window !== 'undefined' && window.__API_URL__) {
        return String(window.__API_URL__);
      }
      if (typeof document !== 'undefined') {
        const meta = document.querySelector('meta[name="backend-api-url"]');
        if (meta && meta.getAttribute('content')) {
          return meta.getAttribute('content');
        }
      }
    } catch (_) {}
    return DEFAULT_PROD_API_URL;
  }

  function getApiUrl() {
    if (isProduction()) {
      return resolveProdApiUrl();
    }
    return DEFAULT_DEV_API_URL;
  }

  // Expõe a configuração globalmente IMEDIATAMENTE
  if (typeof window !== 'undefined') {
    window.APIConfig = {
      isProduction: isProduction,
      getApiUrl: getApiUrl,
      API_URL: getApiUrl()
    };

    // Logs para ajudar no debug
    if (!isProduction()) {
      console.log('[APIConfig] Ambiente: Desenvolvimento (Localhost)');
      console.log('[APIConfig] API_URL:', window.APIConfig.API_URL);
    } else {
      const url = window.APIConfig.API_URL;
      if (!url) {
        console.warn('[APIConfig] Ambiente: Produção - Nenhuma API_URL definida. Defina window.__API_URL__ ou a meta tag <meta name="backend-api-url" ...>.');
      } else {
        console.log('[APIConfig] Ambiente: Produção (Vercel)');
        console.log('[APIConfig] API_URL:', url);
      }
    }
  }
})();
