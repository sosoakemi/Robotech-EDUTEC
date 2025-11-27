/**
 * Script de Verificação de Autenticação
 * Adicione este script no início de qualquer página que requer login
 */

(function() {
  // Verificar se usuário está autenticado
  const token = sessionStorage.getItem('token');
  const usuario = sessionStorage.getItem('usuario');
  
  if (!token || !usuario) {
    // Usuário não está logado - redirecionar para home
    alert('🔒 Você precisa fazer login para acessar esta página.');
    window.location.href = '/index.html';
  } else {
    // Opcional: Verificar se o token é válido (se tiver endpoint de validação)
    try {
      const dadosUsuario = JSON.parse(usuario);
      console.log('✅ Usuário autenticado:', dadosUsuario.name);
      
      // Opcional: Adicionar informações do usuário na página
      // Você pode criar um elemento no HTML para mostrar o nome do usuário
      const usuarioHeader = document.getElementById('nomeUsuario');
      if (usuarioHeader) {
        usuarioHeader.textContent = dadosUsuario.name;
      }
    } catch (erro) {
      console.error('Erro ao verificar usuário:', erro);
      sessionStorage.clear();
      window.location.href = '/index.html';
    }
  }
})();

