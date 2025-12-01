const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  
  // CORREÇÃO AQUI: Mudou de DB_PASS para DB_PASSWORD (igual ao Render)
  password: process.env.DB_PASSWORD, 
  
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Usa 3306 se não tiver nada configurado
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function query(sql, params) {
  const [results, ] = await pool.execute(sql, params);
  return results;
}

module.exports = { query };