// Configuração da API
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5001' 
  : 'https://backend-edutec-pi.vercel.app';

// Funções de modal
function abrirModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function fecharModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
  document.body.style.overflow = 'auto';
  // Limpar mensagens de erro
  const erroEl = document.getElementById(modalId.replace('modal', 'erro').replace('Modal', ''));
  if (erroEl) erroEl.style.display = 'none';
}

function trocarModal(deModal, paraModal) {
  fecharModal(deModal);
  setTimeout(() => abrirModal(paraModal), 200);
}

// Fechar modal ao clicar fora
window.onclick = function(evento) {
  if (evento.target.classList.contains('modal')) {
    evento.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Lidar com Login
async function handleLogin(evento) {
  evento.preventDefault();
  
  const email = document.getElementById('emailLogin').value;
  const senha = document.getElementById('senhaLogin').value;
  const erroEl = document.getElementById('erroLogin');
  const btnSubmit = document.getElementById('btnSubmitLogin');
  
  erroEl.style.display = 'none';
  btnSubmit.disabled = true;
  btnSubmit.innerHTML = '<i class="ri-loader-4-line girando"></i> Entrando...';
  
  try {
    const resposta = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: senha })
    });
    
    const dados = await resposta.json();
    
    if (resposta.ok && dados.success) {
      sessionStorage.setItem('token', dados.data.token);
      sessionStorage.setItem('usuario', JSON.stringify(dados.data));
      
      fecharModal('modalLogin');
      window.location.reload();
    } else {
      throw new Error(dados.error || 'Erro ao fazer login');
    }
  } catch (erro) {
    erroEl.textContent = erro.message;
    erroEl.style.display = 'block';
    btnSubmit.disabled = false;
    btnSubmit.innerHTML = '<i class="ri-login-box-line"></i> Entrar';
  }
}

// Lidar com Cadastro
async function handleCadastro(evento) {
  evento.preventDefault();
  
  const nome = document.getElementById('nomeCadastro').value;
  const email = document.getElementById('emailCadastro').value;
  const senha = document.getElementById('senhaCadastro').value;
  const confirmarSenha = document.getElementById('confirmarSenhaCadastro').value;
  const tipoConta = document.getElementById('tipoConta').value;
  const erroEl = document.getElementById('erroCadastro');
  const btnSubmit = document.getElementById('btnSubmitCadastro');
  
  erroEl.style.display = 'none';
  
  if (senha !== confirmarSenha) {
    erroEl.textContent = 'As senhas não coincidem';
    erroEl.style.display = 'block';
    return;
  }
  
  btnSubmit.disabled = true;
  btnSubmit.innerHTML = '<i class="ri-loader-4-line girando"></i> Cadastrando...';
  
  try {
    const resposta = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nome, email, password: senha, role: tipoConta })
    });
    
    const dados = await resposta.json();
    
    if (resposta.ok && dados.success) {
      sessionStorage.setItem('token', dados.data.token);
      sessionStorage.setItem('usuario', JSON.stringify(dados.data));
      
      fecharModal('modalCadastro');
      window.location.reload();
    } else {
      throw new Error(dados.error || 'Erro ao cadastrar');
    }
  } catch (erro) {
    erroEl.textContent = erro.message;
    erroEl.style.display = 'block';
    btnSubmit.disabled = false;
    btnSubmit.innerHTML = '<i class="ri-user-add-line"></i> Criar Conta';
  }
}

// Lidar com Esqueceu Senha
async function handleEsqueceuSenha(evento) {
  evento.preventDefault();
  
  const email = document.getElementById('emailEsqueceu').value;
  const erroEl = document.getElementById('erroEsqueceu');
  const sucessoEl = document.getElementById('sucessoEsqueceu');
  const btnSubmit = document.getElementById('btnSubmitEsqueceu');
  
  erroEl.style.display = 'none';
  sucessoEl.style.display = 'none';
  
  // Como não temos endpoint de recuperação ainda, simular
  btnSubmit.disabled = true;
  btnSubmit.innerHTML = '<i class="ri-loader-4-line girando"></i> Enviando...';
  
  setTimeout(() => {
    sucessoEl.textContent = `Instruções enviadas para ${email}. Verifique sua caixa de entrada.`;
    sucessoEl.style.display = 'block';
    btnSubmit.disabled = false;
    btnSubmit.innerHTML = '<i class="ri-mail-send-line"></i> Enviar Instruções';
    document.getElementById('formEsqueceu').reset();
  }, 1500);
}

// Verificar se usuário está logado
function verificarAutenticacao() {
  const usuario = sessionStorage.getItem('usuario');
  const btnEntrar = document.getElementById('btnEntrar');
  
  if (usuario) {
    const dadosUsuario = JSON.parse(usuario);
    btnEntrar.innerHTML = `<i class="ri-user-3-line"></i> ${dadosUsuario.name}`;
    btnEntrar.onclick = mostrarMenuUsuario;
  }
}

function mostrarMenuUsuario() {
  const confirmarSaida = confirm('Deseja sair da sua conta?');
  if (confirmarSaida) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    window.location.reload();
  }
}

// Verificar autenticação ao carregar
document.addEventListener('DOMContentLoaded', function() {
  verificarAutenticacao();
});

