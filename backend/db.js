const { query } = require('./lib/database'); 

// Mapeamento: O código Javascript usa inglês, o Banco usa português.
// Usamos "AS" no SQL para traduzir na volta.

async function buscarTodosUsuarios() {
  const res = await query(`
    SELECT 
      id, 
      nome as name, 
      email, 
      'student' as role, 
      null as avatar 
    FROM robotech_usuarios
  `, []);
  return res.rows;
}

async function buscarUsuarioPorEmail(email) {
  const res = await query(`
    SELECT 
      id, 
      nome as name, 
      email, 
      senha as password, 
      'student' as role, 
      null as avatar 
    FROM robotech_usuarios 
    WHERE email = $1
  `, [email.toLowerCase()]);
  
  return res.rows[0] || null;
}

async function buscarUsuarioPorId(id) {
  const res = await query(`
    SELECT 
      id, 
      nome as name, 
      email, 
      senha as password, 
      'student' as role, 
      null as avatar 
    FROM robotech_usuarios 
    WHERE id = $1
  `, [id]);
  
  return res.rows[0] || null;
}

async function criarUsuario(usuario) {
  const now = new Date();
  
  // Nota: Não enviamos o ID, o banco cria sozinho (Serial/AutoIncrement)
  // Usamos RETURNING id para saber qual número foi gerado
  const res = await query(
    `INSERT INTO robotech_usuarios (nome, email, senha, criado_em) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id`,
    [usuario.name, usuario.email.toLowerCase(), usuario.password, now]
  );
  
  const novoId = res.rows[0].id;
  return await buscarUsuarioPorId(novoId);
}

async function atualizarUsuario(id, dadosAtualizados) {
  const campos = [];
  const valores = [];
  let contador = 1;

  // Mapeamento Javascript -> Banco de Dados
  if (dadosAtualizados.name) {
    campos.push(`nome = $${contador++}`);
    valores.push(dadosAtualizados.name);
  }
  if (dadosAtualizados.email) {
    campos.push(`email = $${contador++}`);
    valores.push(dadosAtualizados.email.toLowerCase());
  }
  if (dadosAtualizados.password) {
    campos.push(`senha = $${contador++}`);
    valores.push(dadosAtualizados.password);
  }

  // Se não tiver nada para atualizar, retorna o usuário atual
  if (campos.length === 0) return await buscarUsuarioPorId(id);

  valores.push(id);
  
  await query(
    `UPDATE robotech_usuarios SET ${campos.join(', ')} WHERE id = $${contador}`, 
    valores
  );
  
  return await buscarUsuarioPorId(id);
}

async function deletarUsuario(id) {
  const res = await query('DELETE FROM robotech_usuarios WHERE id = $1', [id]);
  return res.rowCount > 0;
}

module.exports = {
  buscarTodosUsuarios,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
};