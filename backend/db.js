const { query } = require('./lib/mysql');
const { randomUUID } = require('crypto');

// Mapeamento entre o modelo antigo (JSON) e a tabela MySQL
// Tabela users sugerida:
// id (VARCHAR(36) PK), name VARCHAR(255), email VARCHAR(255) UNIQUE,
// password VARCHAR(255), role VARCHAR(50), avatar TEXT NULL,
// is_active TINYINT(1) DEFAULT 1, created_at DATETIME, last_login DATETIME NULL

async function buscarTodosUsuarios() {
  const rows = await query('SELECT id, name, email, role, avatar, is_active AS isActive, created_at AS createdAt, last_login AS lastLogin FROM users', []);
  return rows;
}

async function buscarUsuarioPorEmail(email) {
  const rows = await query('SELECT id, name, email, password, role, avatar, is_active AS isActive, created_at AS createdAt, last_login AS lastLogin FROM users WHERE email = ?', [email.toLowerCase()]);
  return rows[0] || null;
}

async function buscarUsuarioPorId(id) {
  const rows = await query('SELECT id, name, email, password, role, avatar, is_active AS isActive, created_at AS createdAt, last_login AS lastLogin FROM users WHERE id = ?', [id]);
  return rows[0] || null;
}

async function criarUsuario(usuario) {
  const id = randomUUID();
  const now = new Date();
  await query(
    'INSERT INTO users (id, name, email, password, role, avatar, is_active, created_at, last_login) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [id, usuario.name, usuario.email.toLowerCase(), usuario.password, usuario.role || 'student', usuario.avatar || null, 1, now, null]
  );
  const inserted = await buscarUsuarioPorId(id);
  return inserted;
}

async function atualizarUsuario(id, dadosAtualizados) {
  const campos = [];
  const valores = [];

  const mapping = {
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    avatar: 'avatar',
    isActive: 'is_active',
    lastLogin: 'last_login'
  };

  Object.keys(dadosAtualizados).forEach((k) => {
    if (mapping[k] !== undefined) {
      campos.push(`${mapping[k]} = ?`);
      if (k === 'email') valores.push(String(dadosAtualizados[k]).toLowerCase());
      else valores.push(dadosAtualizados[k]);
    }
  });

  if (campos.length === 0) return await buscarUsuarioPorId(id);

  valores.push(id);
  await query(`UPDATE users SET ${campos.join(', ')} WHERE id = ?`, valores);
  return await buscarUsuarioPorId(id);
}

async function deletarUsuario(id) {
  const res = await query('DELETE FROM users WHERE id = ?', [id]);
  return res.affectedRows > 0;
}

module.exports = {
  buscarTodosUsuarios,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
};

