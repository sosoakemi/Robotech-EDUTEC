const jwt = require('jsonwebtoken');
const db = require('../db');

// Middleware para proteger rotas
exports.protect = async (req, res, next) => {
  let token;

  // Verificar se o token existe no header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ 
      error: 'Não autorizado - Token não fornecido' 
    });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-padrao-mude-isso');

    // Buscar usuário (MySQL)
    const user = await db.buscarUsuarioPorId(decoded.id);

    if (!user) {
      return res.status(401).json({ 
        error: 'Usuário não encontrado' 
      });
    }

    if (!user.isActive) {
      return res.status(401).json({ 
        error: 'Conta desativada' 
      });
    }

    // Remover senha antes de adicionar ao req
    const { password: _, ...usuarioSemSenha } = user;
    req.user = usuarioSemSenha;

    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return res.status(401).json({ 
      error: 'Não autorizado - Token inválido' 
    });
  }
};

// Middleware para verificar roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Role '${req.user.role}' não tem permissão para acessar esta rota`
      });
    }
    next();
  };
};

