const mysql = require('mysql2/promise');

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_PORT
} = process.env;

let pool;

function getPool() {
  if (!pool) {
    if (!DB_HOST || !DB_NAME || !DB_USER) {
      throw new Error('Variáveis de ambiente do MySQL ausentes: DB_HOST, DB_NAME, DB_USER, DB_PASSWORD');
    }

    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD || '',
      database: DB_NAME,
      port: DB_PORT ? Number(DB_PORT) : 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      // ssl: { rejectUnauthorized: true }, // habilite se o provedor exigir SSL
    });
  }
  return pool;
}

async function query(sql, params) {
  const p = getPool();
  const [rows] = await p.execute(sql, params);
  return rows;
}

module.exports = {
  getPool,
  query,
};
