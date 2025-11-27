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
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    // Verificar se usuário já existe
    const userExists = await db.buscarUsuarioPorEmail(email);

    if (userExists) {
      return res.status(400).json({ 
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

    const novoUsuario = await db.criarUsuario(usuario);

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
    console.error('Erro no registro:', error);
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

    // Validar dados
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email e senha são obrigatórios' 
      });
    }

    // Buscar usuário
    const user = await db.buscarUsuarioPorEmail(email);

    if (!user) {
      return res.status(401).json({ 
        error: 'Credenciais inválidas' 
      });
    }

    // Verificar senha
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ 
        error: 'Credenciais inválidas' 
      });
    }

    // Verificar se conta está ativa
    if (!user.isActive) {
      return res.status(401).json({ 
        error: 'Conta desativada' 
      });
    }

    // Atualizar último login
    const lastLogin = new Date().toISOString();
    await db.atualizarUsuario(user.id, { lastLogin });

    // Refletir no objeto de resposta
    user.lastLogin = lastLogin;

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
      return res.status(404).json({ 
        error: 'Usuário não encontrado' 
      });
    }

    // Retornar sem senha
    const { password: _, ...usuarioSemSenha } = user;

    res.json({
      success: true,
      data: usuarioSemSenha
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar dados do usuário' 
    });
  }
};

// @desc    Logout (apenas para limpar no frontend)
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logout realizado com sucesso'
  });
};

// @desc    Atualizar perfil do usuário
// @route   PUT /api/auth/perfil
// @access  Private
exports.atualizarPerfil = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    // Buscar usuário
    const user = await db.buscarUsuarioPorId(req.user.id);

    if (!user) {
      return res.status(404).json({ 
        error: 'Usuário não encontrado' 
      });
    }

    // Verificar se o email já está em uso por outro usuário
    if (email && email !== user.email) {
      const emailExists = await db.buscarUsuarioPorEmail(email);
      if (emailExists) {
        return res.status(400).json({ 
          error: 'Este email já está em uso' 
        });
      }
    }

    // Atualizar campos
    const dadosAtualizados = {};
    if (name) dadosAtualizados.name = name;
    if (email) dadosAtualizados.email = email;
    if (avatar !== undefined) dadosAtualizados.avatar = avatar;

    const usuarioAtualizado = await db.atualizarUsuario(user.id, dadosAtualizados);

    // Retornar sem senha
    const { password: _, ...usuarioSemSenha } = usuarioAtualizado;

    res.json({
      success: true,
      message: 'Perfil atualizado com sucesso',
      data: usuarioSemSenha
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ 
      error: 'Erro ao atualizar perfil',
      message: error.message 
    });
  }
};

// @desc    Alterar senha do usuário
// @route   PUT /api/auth/senha
// @access  Private
exports.alterarSenha = async (req, res) => {
  try {
    const { senhaAtual, novaSenha } = req.body;

    // Validar dados
    if (!senhaAtual || !novaSenha) {
      return res.status(400).json({ 
        error: 'Senha atual e nova senha são obrigatórias' 
      });
    }

    if (novaSenha.length < 6) {
      return res.status(400).json({ 
        error: 'A nova senha deve ter no mínimo 6 caracteres' 
      });
    }

    // Buscar usuário
    const user = await db.buscarUsuarioPorId(req.user.id);

    if (!user) {
      return res.status(404).json({ 
        error: 'Usuário não encontrado' 
      });
    }

    // Verificar senha atual
    const isMatch = await bcrypt.compare(senhaAtual, user.password);

    if (!isMatch) {
      return res.status(401).json({ 
        error: 'Senha atual incorreta' 
      });
    }

    // Hash da nova senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(novaSenha, salt);

    // Atualizar senha
    await db.atualizarUsuario(user.id, { password: hashedPassword });

    res.json({
      success: true,
      message: 'Senha alterada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({ 
      error: 'Erro ao alterar senha',
      message: error.message 
    });
  }
};

// @desc    Deletar conta do usuário
// @route   DELETE /api/auth/conta
// @access  Private
exports.deletarConta = async (req, res) => {
  try {
    const { senha, confirmacao } = req.body;

    // Validar confirmação
    if (confirmacao !== 'DELETAR') {
      return res.status(400).json({ 
        error: 'Digite DELETAR para confirmar a exclusão da conta' 
      });
    }

    // Buscar usuário
    const user = await db.buscarUsuarioPorId(req.user.id);

    if (!user) {
      return res.status(404).json({ 
        error: 'Usuário não encontrado' 
      });
    }

    // Verificar senha se fornecida
    if (senha) {
      const isMatch = await bcrypt.compare(senha, user.password);
      if (!isMatch) {
        return res.status(401).json({ 
          error: 'Senha incorreta' 
        });
      }
    }

    // Deletar usuário
    await db.deletarUsuario(user.id);

    res.json({
      success: true,
      message: 'Conta deletada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar conta:', error);
    res.status(500).json({ 
      error: 'Erro ao deletar conta',
      message: error.message 
    });
  }
};
