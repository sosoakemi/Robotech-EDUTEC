(function () {
  // Configuração inteligente da URL
  const loginUrl = document.body.dataset.loginUrl || 'autenticacao.html#login';
  const homeUrl = document.body.dataset.homeUrl || 'index.html';
  
  // CORREÇÃO 1: Usar window.APIConfig se disponível
  const apiUrl = (window.APIConfig && window.APIConfig.API_URL) || 
                 document.body.dataset.apiUrl || 
                 'https://backend-edutec.onrender.com';

  function obterLoginAbsoluto(alvo) {
    return new URL(alvo, window.location.href).href;
  }

  function estaLogado() {
    return !!sessionStorage.getItem('usuarioAtual');
  }

  function obterUsuarioAtual() {
    try {
      return JSON.parse(sessionStorage.getItem('usuarioAtual') || '{}');
    } catch (erro) {
      return {};
    }
  }

  function direcionarParaLogin(destino) {
    if (destino) {
      sessionStorage.setItem('destinoProtegido', destino);
    }
    window.location.href = obterLoginAbsoluto(loginUrl);
  }

  function criarMenuUsuario(nome) {
    let menu = document.querySelector('.menu-usuario');
    if (!menu) {
      menu = document.createElement('div');
      menu.className = 'menu-usuario';
      menu.innerHTML = `
        <button type="button" class="menu-usuario__acao" data-acao="voltar">
          <i class="ri-arrow-left-line"></i>
          Voltar para home
        </button>
        <button type="button" class="menu-usuario__acao" data-acao="sair">
          <i class="ri-logout-box-line"></i>
          Sair da conta
        </button>
        <button type="button" class="menu-usuario__acao menu-usuario__acao--perigo" data-acao="excluir">
          <i class="ri-delete-bin-6-line"></i>
          Excluir conta
        </button>
      `;
      document.body.appendChild(menu);
    }
    menu.dataset.visivel = 'true';
    setTimeout(() => menu.classList.add('menu-usuario--aberto'), 10);
    
    // Ação Voltar
    menu.querySelector('[data-acao="voltar"]').onclick = () => {
      window.location.href = new URL(homeUrl, window.location.href).href;
    };
    
    // Ação Sair
    menu.querySelector('[data-acao="sair"]').onclick = () => {
      if (confirm('Deseja sair da sua conta?')) {
        sessionStorage.removeItem('usuarioAtual');
        sessionStorage.removeItem('token'); // Limpa o token também
        sessionStorage.removeItem('destinoProtegido');
        fecharMenuUsuario();
        window.location.href = new URL(homeUrl, window.location.href).href;
      }
    };

    // CORREÇÃO 2: Ação Excluir (Atualizada para a nova API)
    menu.querySelector('[data-acao="excluir"]').onclick = async () => {
      // 1. Confirmação simples
      if (!confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
        return;
      }
      
      // 2. Pegar o Token
      const token = sessionStorage.getItem('token');
      if (!token) {
         alert('Erro de autenticação. Faça login novamente.');
         return;
      }

      // 3. Pedir a senha (obrigatório no novo backend)
      const senha = prompt('Para confirmar a exclusão, digite sua senha:');
      if (!senha) return; // Cancelou

      try {
        // 4. Requisição correta
        const resposta = await fetch(`${apiUrl}/api/auth/conta`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Token no cabeçalho
          },
          body: JSON.stringify({
              senha: senha,
              confirmacao: 'DELETAR' // Confirmação exigida pelo backend
          })
        });

        const dados = await resposta.json();
        
        if (!resposta.ok) {
          throw new Error(dados.error || dados.erro || 'Erro ao excluir conta.');
        }

        alert('Conta removida com sucesso. Sentiremos sua falta!');
        
        // Limpeza total
        sessionStorage.clear();
        fecharMenuUsuario();
        window.location.href = new URL(homeUrl, window.location.href).href;

      } catch (erro) {
        alert(erro.message || 'Não foi possível excluir a conta agora.');
      }
    };
    
    document.addEventListener('click', cliqueForaMenu);
  }

  function fecharMenuUsuario() {
    const menu = document.querySelector('.menu-usuario');
    if (!menu) return;
    menu.classList.remove('menu-usuario--aberto');
    menu.dataset.visivel = 'false';
    document.removeEventListener('click', cliqueForaMenu);
  }

  function cliqueForaMenu(evento) {
    const menu = document.querySelector('.menu-usuario');
    if (!menu || menu.contains(evento.target)) return;
    if (evento.target.matches('[data-botao-login]')) return;
    fecharMenuUsuario();
  }

  function atualizarBotaoLogin() {
    const botao = document.querySelector('[data-botao-login]');
    if (!botao) return;

    if (estaLogado()) {
      const usuario = obterUsuarioAtual();
      const nome = usuario.nome || usuario.name || 'Conta';
      botao.href = '#menu';
      botao.innerHTML = `<i class="ri-user-settings-line"></i> ${nome.split(' ')[0]}`;
      botao.addEventListener('click', (evento) => {
        evento.preventDefault();
        const menuVisivel = document.querySelector('.menu-usuario[data-visivel="true"]');
        if (menuVisivel) {
          fecharMenuUsuario();
        } else {
          criarMenuUsuario(nome);
        }
      });
    } else {
      botao.href = loginUrl;
    }
  }

  function protegerLinks() {
    document.querySelectorAll('[data-protegido]').forEach((link) => {
      link.addEventListener('click', (evento) => {
        if (!estaLogado()) {
          evento.preventDefault();
          direcionarParaLogin(link.href);
        }
      });
    });
  }

  function verificarPaginaProtegida() {
    if (document.body.classList.contains('pagina-protegida') && !estaLogado()) {
      direcionarParaLogin(window.location.href);
    }
  }

  atualizarBotaoLogin();
  protegerLinks();
  verificarPaginaProtegida();
})();