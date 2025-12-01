// CORREÇÃO 1: Usa a configuração global (api-config.js) se existir, ou o link direto
const API_URL = (window.APIConfig && window.APIConfig.API_URL) || 'https://backend-edutec.onrender.com';

const abas = document.querySelectorAll('.aba');
const areas = document.querySelectorAll('.area-formulario');
const controlesAbertura = document.querySelectorAll('[data-abrir]');
const anoAtual = document.getElementById('anoAtual');
if (anoAtual) anoAtual.textContent = new Date().getFullYear();

function mostrarArea(id) {
  areas.forEach((area) => {
    area.classList.toggle('ativa', area.id === id);
  });

  abas.forEach((aba) => {
    const alvo = (aba.getAttribute('data-alvo') || '').replace('#', '');
    aba.classList.toggle('ativa', alvo === id);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const usuarioAtual = sessionStorage.getItem('usuarioAtual');
  if (usuarioAtual) {
    const destino = sessionStorage.getItem('destinoProtegido');
    if (destino) {
      sessionStorage.removeItem('destinoProtegido');
    }
    window.location.replace(destino || 'index.html');
  }
});

abas.forEach((aba) => {
  aba.addEventListener('click', () => {
    const alvo = (aba.getAttribute('data-alvo') || '').replace('#', '');
    mostrarArea(alvo);
  });
});

controlesAbertura.forEach((botao) => {
  botao.addEventListener('click', () => {
    const alvo = botao.getAttribute('data-abrir');
    if (alvo) {
      mostrarArea(alvo);
      document.getElementById(`form${alvo.charAt(0).toUpperCase()}${alvo.slice(1)}`)?.focus?.();
    }
  });
});

const formLogin = document.getElementById('formLogin');
const mensagemLogin = document.getElementById('mensagemLogin');
const formCadastro = document.getElementById('formCadastro');
const mensagemCadastro = document.getElementById('mensagemCadastro');
const formEsqueci = document.getElementById('formEsqueci');
const mensagemEsqueci = document.getElementById('mensagemEsqueci');

function mostrarMensagem(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = `mensagem ${tipo}`;
}

function limparMensagem(elemento) {
  elemento.textContent = '';
  elemento.className = 'mensagem';
}

// ----------------------------------------------------
// LOGIN
// ----------------------------------------------------
if (formLogin) {
  formLogin.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value.trim();
    const botao = formLogin.querySelector('.botao-acao');

    limparMensagem(mensagemLogin);
    botao.disabled = true;
    botao.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Entrando...';

    try {
      // CORREÇÃO 2: Rota atualizada para /api/auth/login
      const resposta = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // CORREÇÃO 3: Enviando "password" em vez de "senha"
        body: JSON.stringify({ email, password: senha }) 
      });

      let dados;
      try {
        dados = await resposta.json();
      } catch (parseErro) {
        throw new Error('Servidor não respondeu corretamente. Verifique se o backend está rodando.');
      }

      if (!resposta.ok) {
        throw new Error(dados.error || dados.erro || 'Não foi possível entrar.');
      }

      mostrarMensagem(mensagemLogin, 'Login realizado com sucesso!', 'sucesso');
      
      // O backend novo devolve { data: { token, ... } }
      // Ajustamos para salvar o objeto correto
      const usuarioParaSalvar = dados.data || dados.usuario || dados;
      sessionStorage.setItem('usuarioAtual', JSON.stringify(usuarioParaSalvar));
      
      // Se tiver token, salva separado também para facilitar
      if(usuarioParaSalvar.token) {
        sessionStorage.setItem('token', usuarioParaSalvar.token);
      }

      const destino = sessionStorage.getItem('destinoProtegido');
      if (destino) {
        sessionStorage.removeItem('destinoProtegido');
      }

      setTimeout(() => {
        window.location.href = destino || 'index.html';
      }, 600);
    } catch (erro) {
      if (erro.message.includes('Failed to fetch') || erro.message.includes('NetworkError')) {
        mostrarMensagem(mensagemLogin, 'Erro de conexão. O servidor pode estar offline.', 'erro');
      } else {
        mostrarMensagem(mensagemLogin, erro.message || 'Erro ao realizar login.', 'erro');
      }
    } finally {
      botao.disabled = false;
      botao.innerHTML = '<i class="ri-login-box-line"></i> Entrar';
    }
  });
}

// ----------------------------------------------------
// CADASTRO
// ----------------------------------------------------
if (formCadastro) {
  formCadastro.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const nome = document.getElementById('cadastroNome').value.trim();
    const email = document.getElementById('cadastroEmail').value.trim();
    const senha = document.getElementById('cadastroSenha').value.trim();
    const confirmacao = document.getElementById('cadastroConfirmacao').value.trim();
    const botao = formCadastro.querySelector('.botao-acao');

    limparMensagem(mensagemCadastro);

    if (senha !== confirmacao) {
      mostrarMensagem(mensagemCadastro, 'As senhas não coincidem.', 'erro');
      return;
    }

    botao.disabled = true;
    botao.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Criando...';

    try {
      // CORREÇÃO 4: Rota atualizada para /api/auth/register
      const resposta = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // CORREÇÃO 5: Traduzindo chaves para o backend (name, password)
        body: JSON.stringify({ name: nome, email, password: senha })
      });

      // Tratamento especial para erro 409 (Email duplicado)
      if (resposta.status === 409) {
         throw new Error('Este e-mail já está cadastrado. Tente fazer login.');
      }

      let dados;
      try {
        dados = await resposta.json();
      } catch (parseErro) {
        throw new Error('Servidor não respondeu JSON válido.');
      }

      if (!resposta.ok) {
        throw new Error(dados.error || dados.erro || 'Não foi possível criar a conta.');
      }

      mostrarMensagem(mensagemCadastro, 'Conta criada com sucesso! Você já pode entrar.', 'sucesso');
      formCadastro.reset();

      // Aguarda um pouco e muda para a aba de login
      setTimeout(() => {
          mostrarArea('login');
      }, 1500);

    } catch (erro) {
      if (erro.message.includes('Failed to fetch')) {
        mostrarMensagem(mensagemCadastro, 'Erro de conexão com o servidor.', 'erro');
      } else {
        mostrarMensagem(mensagemCadastro, erro.message || 'Erro ao criar conta.', 'erro');
      }
    } finally {
      botao.disabled = false;
      botao.innerHTML = '<i class="ri-user-add-line"></i> Criar conta';
    }
  });
}

if (formEsqueci) {
  formEsqueci.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    
    const email = document.getElementById('esqueciEmail').value.trim();
    const novaSenha = document.getElementById('esqueciNovaSenha').value.trim();
    const confirmacao = document.getElementById('esqueciConfirmacao').value.trim();
    const botao = formEsqueci.querySelector('.botao-acao');

    limparMensagem(mensagemEsqueci);

    if (novaSenha !== confirmacao) {
      mostrarMensagem(mensagemEsqueci, 'As senhas digitadas não coincidem.', 'erro');
      return;
    }

    botao.disabled = true;
    botao.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Atualizando...';
    
    // Simulando delay pois não temos a rota ainda
    setTimeout(() => {
        mostrarMensagem(mensagemEsqueci, 'Funcionalidade em desenvolvimento.', 'erro');
        botao.disabled = false;
        botao.innerHTML = '<i class="ri-key-line"></i> Atualizar senha';
    }, 1000);

  });
}