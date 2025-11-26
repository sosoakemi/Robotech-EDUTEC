require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');

const app = express();
const PORTA = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Nome das tabelas conforme seu esquema
const USERS_TABLE = process.env.DB_USERS_TABLE || 'robotech_usuarios';
const SCORES_TABLE = process.env.DB_SCORES_TABLE || 'robotech_pontuacoes';

// Conexão MySQL usando variáveis DB_ do .env
const pool = mysql
  .createPool({
    host: (process.env.DB_HOST || 'localhost'),
    user: (process.env.DB_USER || 'root').trim(),
    password: (process.env.DB_PASSWORD || '').trim(),
    database: (process.env.DB_NAME || 'robotech'),
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4_general_ci',
  })
  .promise();

async function initDB() {
  // Tabela de usuários (compatível com o esquema fornecido)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ${USERS_TABLE} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      senha VARCHAR(255) NOT NULL,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Tabela de pontuações (compatível com o esquema fornecido)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ${SCORES_TABLE} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT NOT NULL,
      pontos INT NOT NULL,
      data_partida DATETIME DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_${SCORES_TABLE}_usuario FOREIGN KEY (usuario_id) REFERENCES ${USERS_TABLE}(id)
        ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  console.log('MySQL: tabelas verificadas/inicializadas.');
}

function normalizarEmail(email) {
  return (email || '').toLowerCase().trim();
}

app.get('/', async (req, res) => {
  res.json({
    mensagem: 'API RoboTech (MySQL) funcionando',
    recursos: {
      cadastro: 'POST /usuarios',
      pontuacoes: 'POST /usuarios/:id/jogos',
      alterarSenha: 'PUT /usuarios/:id/senha',
      excluirConta: 'DELETE /usuarios/:id',
      ranking: 'GET /ranking/coderobotech'
    }
  });
});

// Cadastro de usuário
app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Informe nome, email e senha.' });
    }

    const emailNorm = normalizarEmail(email);

    // Verificar duplicidade de email
    const [rowsExist] = await pool.query(`SELECT id FROM ${USERS_TABLE} WHERE email = ?`, [emailNorm]);
    if (rowsExist.length > 0) {
      return res.status(409).json({ erro: 'Já existe usuário com este email.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const [result] = await pool.query(
      `INSERT INTO ${USERS_TABLE} (nome, email, senha) VALUES (?, ?, ?)`,
      [nome, emailNorm, senhaHash]
    );

    const novoId = result.insertId;

    const [rowsUser] = await pool.query(
      `SELECT id, nome, email, criado_em FROM ${USERS_TABLE} WHERE id = ?`,
      [novoId]
    );

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.', usuario: rowsUser[0] });
  } catch (erro) {
    console.error('Erro em POST /usuarios:', erro);
    res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Informe email e senha.' });
    }

    const emailNorm = normalizarEmail(email);

    const [rows] = await pool.query(`SELECT * FROM ${USERS_TABLE} WHERE email = ?`, [emailNorm]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    const senhaConfere = await bcrypt.compare(senha, user.senha);
    if (!senhaConfere) {
      return res.status(401).json({ erro: 'Senha inválida.' });
    }

    const [rowsUser] = await pool.query(
      `SELECT id, nome, email, criado_em FROM ${USERS_TABLE} WHERE id = ?`,
      [user.id]
    );

    res.json({ mensagem: 'Login realizado com sucesso.', usuario: rowsUser[0] });
  } catch (erro) {
    console.error('Erro em POST /login:', erro);
    res.status(500).json({ erro: 'Erro ao realizar login.' });
  }
});

// Recuperar senha (redefinição direta)
app.post('/recuperar-senha', async (req, res) => {
  try {
    const { email, novaSenha } = req.body;

    if (!email || !novaSenha) {
      return res.status(400).json({ erro: 'Informe email e nova senha.' });
    }

    const emailNorm = normalizarEmail(email);

    const [rows] = await pool.query(`SELECT id FROM ${USERS_TABLE} WHERE email = ?`, [emailNorm]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ erro: 'Usuário não encontrado com este email.' });
    }

    const senhaHash = await bcrypt.hash(novaSenha, 10);

    await pool.query(
      `UPDATE ${USERS_TABLE} SET senha = ? WHERE id = ?`,
      [senhaHash, user.id]
    );

    res.json({ mensagem: 'Senha redefinida com sucesso.' });
  } catch (erro) {
    console.error('Erro em POST /recuperar-senha:', erro);
    res.status(500).json({ erro: 'Erro ao redefinir senha.' });
  }
});

// Registrar pontuação do usuário
app.post('/usuarios/:id/jogos', async (req, res) => {
  try {
    const { id } = req.params;
    const { pontuacao, pontos } = req.body;

    const valorPontos = Number(pontuacao ?? pontos);

    if (Number.isNaN(valorPontos)) {
      return res.status(400).json({ erro: 'Informe a pontuação (pontos numéricos).' });
    }

    // Verificar usuário
    const [rowsUser] = await pool.query(`SELECT id FROM ${USERS_TABLE} WHERE id = ?`, [id]);
    if (rowsUser.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    const [result] = await pool.query(
      `INSERT INTO ${SCORES_TABLE} (usuario_id, pontos) VALUES (?, ?)`,
      [id, valorPontos]
    );

    const novoScoreId = result.insertId;

    const [rowsInserted] = await pool.query(`SELECT id, usuario_id, pontos, data_partida FROM ${SCORES_TABLE} WHERE id = ?`, [novoScoreId]);

    res.json({ mensagem: 'Pontuação registrada com sucesso.', pontuacao: rowsInserted[0] });
  } catch (erro) {
    console.error('Erro em POST /usuarios/:id/jogos:', erro);
    res.status(500).json({ erro: 'Erro ao salvar pontuação.' });
  }
});

// Alterar senha do usuário (com verificação da senha atual)
app.put('/usuarios/:id/senha', async (req, res) => {
  try {
    const { id } = req.params;
    const { senhaAtual, novaSenha } = req.body;

    if (!senhaAtual || !novaSenha) {
      return res.status(400).json({ erro: 'Informe a senha atual e a nova senha.' });
    }

    const [rows] = await pool.query(`SELECT id, senha FROM ${USERS_TABLE} WHERE id = ?`, [id]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    const confere = await bcrypt.compare(senhaAtual, user.senha);
    if (!confere) {
      return res.status(401).json({ erro: 'Senha atual inválida.' });
    }

    const senhaHash = await bcrypt.hash(novaSenha, 10);

    await pool.query(
      `UPDATE ${USERS_TABLE} SET senha = ? WHERE id = ?`,
      [senhaHash, id]
    );

    res.json({ mensagem: 'Senha atualizada com sucesso.' });
  } catch (erro) {
    console.error('Erro em PUT /usuarios/:id/senha:', erro);
    res.status(500).json({ erro: 'Erro ao atualizar senha.' });
  }
});

/// Deletar conta do usuário
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Verifica se o usuário existe (Isso você já fazia)
    const [rowsUser] = await pool.query(
      `SELECT id, nome, email, criado_em FROM ${USERS_TABLE} WHERE id = ?`,
      [id]
    );

    if (rowsUser.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }
    await pool.query(`DELETE FROM robotech_pontuacoes WHERE usuario_id = ?`, [id]);

    // 3. Agora sim, podemos apagar o usuário sem erro
    await pool.query(`DELETE FROM ${USERS_TABLE} WHERE id = ?`, [id]);

    res.json({ mensagem: 'Conta e pontuações removidas com sucesso.', usuario: rowsUser[0] });
  } catch (erro) {
    console.error('Erro em DELETE /usuarios/:id:', erro);
    res.status(500).json({ erro: 'Erro ao remover conta.' });
  }
});

// Obter usuário por ID
app.get('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT id, nome, email, criado_em FROM ${USERS_TABLE} WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    res.json({ usuario: rows[0] });
  } catch (erro) {
    console.error('Erro em GET /usuarios/:id:', erro);
    res.status(500).json({ erro: 'Erro ao buscar usuário.' });
  }
});

// Ranking (agregado por total de pontos)
app.get('/ranking/coderobotech', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        u.nome AS usuarioId,
        u.nome,
        u.email,
        COALESCE(SUM(p.pontos), 0) AS pontuacaoTotal,
        COALESCE(MAX(p.pontos), 0) AS melhorPontuacao,
        COUNT(p.id) AS totalJogos,
        MAX(p.data_partida) AS ultimoJogo
      FROM ${USERS_TABLE} u
      JOIN ${SCORES_TABLE} p ON p.usuario_id = u.id
      GROUP BY u.nome, u.email
      ORDER BY pontuacaoTotal DESC
      LIMIT 50`
    );

    res.json({ ranking: rows });
  } catch (erro) {
    console.error('Erro em GET /ranking/coderobotech:', erro);
    res.status(500).json({ erro: 'Erro ao buscar ranking.' });
  }
});

// Inicialização e start do servidor
initDB()
  .then(() => {
    app.listen(PORTA, () => {
      console.log(`Servidor MySQL iniciado na porta ${PORTA}`);
    });
  })
  .catch((err) => {
    console.error('Falha ao inicializar banco MySQL:', err);
    process.exit(1);
  });
