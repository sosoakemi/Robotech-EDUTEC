(function () {
  const loginUrl = document.body.dataset.loginUrl || 'autenticacao.html#login';
  const homeUrl = document.body.dataset.homeUrl || 'index.html';
  const apiUrl = document.body.dataset.apiUrl || 'https://backend-edutec.onrender.com';

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
    menu.querySelector('[data-acao="voltar"]').onclick = () => {
      window.location.href = new URL(homeUrl, window.location.href).href;
    };
    menu.querySelector('[data-acao="sair"]').onclick = () => {
      if (confirm('Deseja sair da sua conta?')) {
        sessionStorage.removeItem('usuarioAtual');
        sessionStorage.removeItem('destinoProtegido');
        fecharMenuUsuario();
        window.location.href = new URL(homeUrl, window.location.href).href;
      }
    };
    menu.querySelector('[data-acao="excluir"]').onclick = async () => {
      if (!confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
        return;
      }
      const usuario = obterUsuarioAtual();
      if (!usuario.id) {
        alert('Não foi possível identificar o usuário. Faça login novamente.');
        return;
      }
      try {
        const resposta = await fetch(`${apiUrl}/usuarios/${usuario.id}`, {
          method: 'DELETE'
        });
        const dados = await resposta.json();
        if (!resposta.ok) {
          throw new Error(dados.erro || 'Erro ao excluir conta.');
        }
        alert('Conta removida com sucesso. Sentiremos sua falta!');
        sessionStorage.removeItem('usuarioAtual');
        sessionStorage.removeItem('destinoProtegido');
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
