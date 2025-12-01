const mysql = require('mysql2/promise');

// Cria o pool de conexões usando as variáveis do Render
const pool = mysql.createPool({
  host: process.env.DB_HOST,     // benserverplex.ddns.net
  user: process.env.DB_USER,     // seu usuário
  password: process.env.DB_PASS, // sua senha
  database: process.env.DB_NAME, // web_02mb
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Função auxiliar para executar queries
async function query(sql, params) {
  const [results, ] = await pool.execute(sql, params);
  return results;
}

module.exports = { query };