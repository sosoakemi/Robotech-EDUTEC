const { query } = require('./lib/database');
const { randomUUID } = require('crypto'); // Se o ID for INT no banco, não vamos usar isso.

async function buscarTodosUsuarios() {
  const rows = await query(`
    SELECT 
      id, 
      nome as name, 
      email, 
      'student' as role, 
      null as avatar 
    FROM robotech_usuarios
  `);
  return rows;
}

async function buscarUsuarioPorEmail(email) {
  const rows = await query(`
    SELECT 
      id, 
      nome as name, 
      email, 
      senha as password, 
      'student' as role, 
      null as avatar 
    FROM robotech_usuarios 
    WHERE email = ?
  `, [email.toLowerCase()]);
  
  return rows[0] || null;
}

async function buscarUsuarioPorId(id) {
  const rows = await query(`
    SELECT 
      id, 
      nome as name, 
      email, 
      senha as password, 
      'student' as role, 
      null as avatar 
    FROM robotech_usuarios 
    WHERE id = ?
  `, [id]);
  
  return rows[0] || null;
}

async function criarUsuario(usuario) {
  const now = new Date();
  
  // MySQL: Usamos 'INSERT' normal. O ID é gerado automaticamente (Auto Increment)
  const result = await query(
    `INSERT INTO robotech_usuarios (nome, email, senha, criado_em) VALUES (?, ?, ?, ?)`,
    [usuario.name, usuario.email.toLowerCase(), usuario.password, now]
  );
  
  // No MySQL, pegamos o ID gerado assim:
  const novoId = result.insertId;
  
  return await buscarUsuarioPorId(novoId);
}

async function atualizarUsuario(id, dadosAtualizados) {
  const campos = [];
  const valores = [];

  // Mapeamento Javascript -> MySQL (Português)
  if (dadosAtualizados.name) {
    campos.push('nome = ?');
    valores.push(dadosAtualizados.name);
  }
  if (dadosAtualizados.email) {
    campos.push('email = ?');
    valores.push(dadosAtualizados.email.toLowerCase());
  }
  if (dadosAtualizados.password) {
    campos.push('senha = ?');
    valores.push(dadosAtualizados.password);
  }

  if (campos.length === 0) return await buscarUsuarioPorId(id);

  valores.push(id);
  
  await query(
    `UPDATE robotech_usuarios SET ${campos.join(', ')} WHERE id = ?`, 
    valores
  );
  
  return await buscarUsuarioPorId(id);
}

async function deletarUsuario(id) {
  const result = await query('DELETE FROM robotech_usuarios WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  buscarTodosUsuarios,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
}