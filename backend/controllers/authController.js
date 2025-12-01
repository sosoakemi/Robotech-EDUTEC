const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');

// Gerar JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret-padrao-mude-isso', {
    expiresIn: '30d'
  });
};

// @desc    Registrar novo usuário
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    console.log('--- INÍCIO REGISTER ---');
    console.log('Body recebido:', req.body);

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    // Verificar se usuário já existe
    console.log('Verificando se email existe:', email);
    const userExists = await db.buscarUsuarioPorEmail(email);

    if (userExists) {
      console.log('Usuário já existe no banco.');
      return res.status(409).json({ // Mudei para 409 (Conflict)
        error: 'Usuário já cadastrado com este email' 
      });
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Criar usuário
    const usuario = {
      name,
      email,
      password: hashedPassword,
      role: role || 'student',
      avatar: null
    };

    console.log('Chamando db.criarUsuario...');
    const novoUsuario = await db.criarUsuario(usuario);
    console.log('Retorno de db.criarUsuario:', novoUsuario);

    if (!novoUsuario) {
        throw new Error('Falha crítica: db.criarUsuario retornou nulo');
    }

    // Retornar sem a senha
    const { password: _, ...usuarioSemSenha } = novoUsuario;

    res.status(201).json({
      success: true,
      data: {
        ...usuarioSemSenha,
        token: generateToken(novoUsuario.id)
      }
    });
  } catch (error) {
    console.error('ERRO FATAL NO REGISTRO:', error);
    res.status(500).json({ 
      error: 'Erro ao registrar usuário',
      message: error.message 
    });
  }
};

// @desc    Login de usuário
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Buscar usuário
    const user = await db.buscarUsuarioPorEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificar senha
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // REMOVIDO: Verificação de isActive (coluna não existe no banco)
    // REMOVIDO: Atualização de lastLogin (coluna não existe no banco)

    // Retornar dados e token (sem senha)
    const { password: _, ...usuarioSemSenha } = user;

    res.json({
      success: true,
      data: {
        ...usuarioSemSenha,
        token: generateToken(user.id)
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      error: 'Erro ao fazer login',
      message: error.message 
    });
  }
};

// @desc    Obter dados do usuário logado
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await db.buscarUsuarioPorId(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const { password: _, ...usuarioSemSenha } = user;

    res.json({
      success: true,
      data: usuarioSemSenha
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do usuário' });
  }
};

// @desc    Logout
exports.logout = async (req, res) => {
  res.json({ success: true, message: 'Logout realizado com sucesso' });
};

// @desc    Atualizar perfil
exports.atualizarPerfil = async (req, res) => {
  try {
    const { name, email } = req.body; // Removi avatar se não tiver coluna
    const user = await db.buscarUsuarioPorId(req.user.id);

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    if (email && email !== user.email) {
      const emailExists = await db.buscarUsuarioPorEmail(email);
      if (emailExists) return res.status(400).json({ error: 'Este email já está em uso' });
    }

    const dadosAtualizados = {};
    if (name) dadosAtualizados.name = name;
    if (email) dadosAtualizados.email = email;

    const usuarioAtualizado = await db.atualizarUsuario(user.id, dadosAtualizados);
    const { password: _, ...usuarioSemSenha } = usuarioAtualizado;

    res.json({ success: true, message: 'Perfil atualizado', data: usuarioSemSenha });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
};

// @desc    Alterar senha
exports.alterarSenha = async (req, res) => {
  try {
    const { senhaAtual, novaSenha } = req.body;
    if (!senhaAtual || !novaSenha) return res.status(400).json({ error: 'Dados incompletos' });
    if (novaSenha.length < 6) return res.status(400).json({ error: 'Senha muito curta' });

    const user = await db.buscarUsuarioPorId(req.user.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(senhaAtual, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Senha atual incorreta' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(novaSenha, salt);

    await db.atualizarUsuario(user.id, { password: hashedPassword });

    res.json({ success: true, message: 'Senha alterada com sucesso' });
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({ error: 'Erro ao alterar senha' });
  }
};

// @desc    Deletar conta
exports.deletarConta = async (req, res) => {
  try {
    const { senha, confirmacao } = req.body;
    if (confirmacao !== 'DELETAR') return res.status(400).json({ error: 'Confirmação incorreta' });

    const user = await db.buscarUsuarioPorId(req.user.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    if (senha) {
      const isMatch = await bcrypt.compare(senha, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Senha incorreta' });
    }

    await db.deletarUsuario(user.id);

    res.json({ success: true, message: 'Conta deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar conta:', error);
    res.status(500).json({ error: 'Erro ao deletar conta' });
  }
};