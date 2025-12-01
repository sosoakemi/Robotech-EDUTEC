const mysql = require('mysql2/promise');

console.log('--- TENTANDO CONECTAR AO BANCO ---');
console.log('HOST:', process.env.DB_HOST);
console.log('USER:', process.env.DB_USER);
console.log('DATABASE:', process.env.DB_NAME);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function query(sql, params) {
  try {
    const [results, ] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('❌ ERRO CRÍTICO NO MYSQL:');
    console.error('SQL Tentado:', sql);
    console.error('Mensagem:', error.message);
    throw error;
  }
}

module.exports = { query };