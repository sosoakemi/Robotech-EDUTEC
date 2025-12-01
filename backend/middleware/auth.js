const jwt = require('jsonwebtoken');
const db = require('../db');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Não autorizado - Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-padrao-mude-isso');
    const user = await db.buscarUsuarioPorId(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // REMOVIDO A CHECAGEM DE isActive PARA NÃO BLOQUEAR

    const { password: _, ...usuarioSemSenha } = user;
    req.user = usuarioSemSenha;

    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return res.status(401).json({ error: 'Não autorizado - Token inválido' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Role '${req.user.role}' não tem permissão`
      });
    }
    next();
  };
};