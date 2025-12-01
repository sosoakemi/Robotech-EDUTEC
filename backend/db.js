const { query } = require('./lib/database');

// ==========================================
// PARTE 1: USUÁRIOS (Tabela: robotech_usuarios)
// ==========================================

async function buscarUsuarioPorEmail(email) {
  // Traduz as colunas do banco (português) para o código (inglês)
  const rows = await query(`
    SELECT 
      id, 
      nome as name, 
      email, 
      senha as password, 
      'student' as role,
      criado_em as createdAt
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
      'student' as role 
    FROM robotech_usuarios 
    WHERE id = ?
  `, [id]);
  
  return rows[0] || null;
}

async function criarUsuario(usuario) {
  const now = new Date();
  console.log('1. Iniciando criarUsuario...');
  console.log('2. Dados:', usuario.email);

  try {
    // Tenta inserir
    const result = await query(
      `INSERT INTO robotech_usuarios (nome, email, senha, criado_em) VALUES (?, ?, ?, ?)`,
      [usuario.name, usuario.email.toLowerCase(), usuario.password, now]
    );

    console.log('3. Resultado do Banco:', result);
    
    // Verifica se gerou ID
    if (!result.insertId) {
        console.error('❌ PERIGO: O banco respondeu sucesso, mas NÃO gerou ID!');
    } else {
        console.log('✅ SUCESSO! ID Gerado:', result.insertId);
    }
  
    const novoId = result.insertId;
    return await buscarUsuarioPorId(novoId);

  } catch (e) {
    console.error('❌ ERRO DENTRO DE criarUsuario:', e);
    throw e;
  }
}

// ==========================================
// PARTE 2: PONTUAÇÃO (Tabela: robotech_pontuacoes)
// ==========================================

async function salvarPontuacao(usuarioId, pontos) {
  const now = new Date();

  // Corrigido para usar 'data_partida' conforme sua imagem
  const result = await query(
    `INSERT INTO robotech_pontuacoes (usuario_id, pontos, data_partida) VALUES (?, ?, ?)`,
    [usuarioId, pontos, now]
  );

  return result.insertId;
}

async function buscarRanking() {
  // Busca o Top 10 maiores pontuações
  // Faz o JOIN para pegar o nome do usuário na outra tabela
  const rows = await query(`
    SELECT 
      u.nome, 
      p.pontos, 
      p.data_partida
    FROM robotech_pontuacoes p
    JOIN robotech_usuarios u ON p.usuario_id = u.id
    ORDER BY p.pontos DESC
    LIMIT 10
  `);
  
  return rows;
}

// Funções extras para manter compatibilidade com seu controller antigo
async function buscarTodosUsuarios() {
  const rows = await query("SELECT id, nome as name, email FROM robotech_usuarios");
  return rows;
}

async function deletarUsuario(id) {
  // Cuidado: Se tiver pontuação, o banco pode bloquear deletar por causa da Chave Estrangeira (FK)
  // O ideal seria deletar as pontuações antes, mas aqui tentamos deletar o usuário direto
  const result = await query('DELETE FROM robotech_usuarios WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

// ==========================================
// EXPORTAR TUDO
// ==========================================

module.exports = {
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  buscarTodosUsuarios,
  criarUsuario,
  deletarUsuario,
  salvarPontuacao, 
  buscarRanking    
};