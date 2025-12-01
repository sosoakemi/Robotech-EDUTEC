const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,         // benserverplex.ddns.net
  user: process.env.DB_USER,         // seu usuário
  password: process.env.DB_PASSWORD, // <--- Corrigido para bater com o Render
  database: process.env.DB_NAME,     // web_02mb
  port: 3306,                        // Porta confirmada
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function query(sql, params) {
  try {
    const [results, ] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Erro na query do banco:', error.message);
    throw error; // Repassa o erro para o controller tratar
  }
}

module.exports = { query };