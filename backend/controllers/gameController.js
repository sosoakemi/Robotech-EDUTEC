const db = require('../db');
const { query } = require('../lib/mysql');

// @desc    Salvar pontuação do jogo
// @route   POST /api/game/score
// @access  Private
exports.salvarPontuacao = async (req, res) => {
  try {
    const { jogo, pontuacao, tempo, nivel, dadosExtras } = req.body;
    const userId = req.user.id;

    // Validar dados
    if (!jogo || pontuacao === undefined) {
      return res.status(400).json({ 
        error: 'Jogo e pontuação são obrigatórios' 
      });
    }

    // Verificar usuário
    const user = await db.buscarUsuarioPorId(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Inserir pontuação
    const extras = dadosExtras ? JSON.stringify(dadosExtras) : null;
    const result = await query(
      'INSERT INTO game_scores (user_id, jogo, pontuacao, tempo, nivel, dados_extras) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, jogo, parseInt(pontuacao), tempo ? parseInt(tempo) : null, nivel || null, extras]
    );

    const insertedId = result.insertId;

    // Buscar registro inserido
    const rows = await query('SELECT id, user_id AS userId, jogo, pontuacao, tempo, nivel, dados_extras AS dadosExtras, data_jogo AS dataJogo FROM game_scores WHERE id = ?', [insertedId]);
    const record = rows[0];

    // Estatísticas básicas do usuário
    const [stats] = await query(
      `SELECT COUNT(*) AS totalJogos, MAX(pontuacao) AS melhorPontuacao, COALESCE(SUM(tempo),0) AS tempoTotal, MAX(data_jogo) AS ultimoJogo
       FROM game_scores WHERE user_id = ?`,
      [userId]
    );

    res.json({
      success: true,
      message: 'Pontuação salva com sucesso',
      data: {
        record,
        estatisticas: {
          totalJogos: stats.totalJogos,
          melhorPontuacao: stats.melhorPontuacao || 0,
          tempoTotal: stats.tempoTotal || 0,
          ultimoJogo: stats.ultimoJogo || null
        }
      }
    });

  } catch (error) {
    console.error('Erro ao salvar pontuação:', error);
    res.status(500).json({ 
      error: 'Erro ao salvar pontuação',
      message: error.message 
    });
  }
};

// @desc    Obter pontuações do usuário
// @route   GET /api/game/scores
// @access  Private
exports.obterPontuacoes = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jogo, limite = 10 } = req.query;

    // Verificar usuário
    const user = await db.buscarUsuarioPorId(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Buscar pontuações
    let rows;
    const limit = Math.max(1, Math.min(parseInt(limite), 100));

    if (jogo) {
      rows = await query(
        'SELECT id, user_id AS userId, jogo, pontuacao, tempo, nivel, dados_extras AS dadosExtras, data_jogo AS dataJogo FROM game_scores WHERE user_id = ? AND jogo = ? ORDER BY pontuacao DESC, data_jogo DESC LIMIT ?',
        [userId, jogo, limit]
      );
    } else {
      rows = await query(
        'SELECT id, user_id AS userId, jogo, pontuacao, tempo, nivel, dados_extras AS dadosExtras, data_jogo AS dataJogo FROM game_scores WHERE user_id = ? ORDER BY pontuacao DESC, data_jogo DESC LIMIT ?',
        [userId, limit]
      );
    }

    // Estatísticas
    const [stats] = await query(
      `SELECT COUNT(*) AS totalJogos, MAX(pontuacao) AS melhorPontuacao, COALESCE(SUM(tempo),0) AS tempoTotal, MAX(data_jogo) AS ultimoJogo
       FROM game_scores WHERE user_id = ?`,
      [userId]
    );

    res.json({
      success: true,
      data: {
        pontuacoes: rows,
        estatisticas: {
          totalJogos: stats.totalJogos,
          melhorPontuacao: stats.melhorPontuacao || 0,
          tempoTotal: stats.tempoTotal || 0,
          ultimoJogo: stats.ultimoJogo || null
        }
      }
    });

  } catch (error) {
    console.error('Erro ao obter pontuações:', error);
    res.status(500).json({ 
      error: 'Erro ao obter pontuações',
      message: error.message 
    });
  }
};

// @desc    Obter ranking geral
// @route   GET /api/game/ranking
// @access  Public
exports.obterRanking = async (req, res) => {
  try {
    const { jogo, limite = 10 } = req.query;
    const limit = Math.max(1, Math.min(parseInt(limite), 200));

    let rows;
    if (jogo) {
      rows = await query(
        `SELECT gs.id, gs.user_id AS userId, gs.jogo, gs.pontuacao, gs.tempo, gs.nivel, gs.dados_extras AS dadosExtras, gs.data_jogo AS dataJogo,
                u.name AS nomeUsuario, u.email AS emailUsuario
         FROM game_scores gs
         JOIN users u ON u.id = gs.user_id
         WHERE gs.jogo = ?
         ORDER BY gs.pontuacao DESC, gs.data_jogo DESC
         LIMIT ?`,
        [jogo, limit]
      );
    } else {
      rows = await query(
        `SELECT gs.id, gs.user_id AS userId, gs.jogo, gs.pontuacao, gs.tempo, gs.nivel, gs.dados_extras AS dadosExtras, gs.data_jogo AS dataJogo,
                u.name AS nomeUsuario, u.email AS emailUsuario
         FROM game_scores gs
         JOIN users u ON u.id = gs.user_id
         ORDER BY gs.pontuacao DESC, gs.data_jogo DESC
         LIMIT ?`,
        [limit]
      );
    }

    res.json({
      success: true,
      data: {
        ranking: rows,
        totalJogadores: undefined,
        jogo: jogo || 'todos'
      }
    });

  } catch (error) {
    console.error('Erro ao obter ranking:', error);
    res.status(500).json({ 
      error: 'Erro ao obter ranking',
      message: error.message 
    });
  }
};

// @desc    Obter estatísticas do usuário
// @route   GET /api/game/stats
// @access  Private
exports.obterEstatisticas = async (req, res) => {
  try {
    const userId = req.user.id;

    // Verificar usuário
    const user = await db.buscarUsuarioPorId(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Estatísticas agregadas
    const [stats] = await query(
      `SELECT COUNT(*) AS totalJogos, COALESCE(MAX(pontuacao),0) AS melhorPontuacao, COALESCE(SUM(tempo),0) AS tempoTotal, MAX(data_jogo) AS ultimoJogo
       FROM game_scores WHERE user_id = ?`,
      [userId]
    );

    // Distribuição por tipo de jogo
    const jogosPorTipo = await query(
      `SELECT jogo, COUNT(*) AS quantidade
       FROM game_scores WHERE user_id = ?
       GROUP BY jogo
       ORDER BY quantidade DESC`,
      [userId]
    );

    // Pontuações recentes
    const pontuacoesRecentes = await query(
      `SELECT id, user_id AS userId, jogo, pontuacao, tempo, nivel, dados_extras AS dadosExtras, data_jogo AS dataJogo
       FROM game_scores WHERE user_id = ?
       ORDER BY data_jogo DESC
       LIMIT 5`,
      [userId]
    );

    res.json({
      success: true,
      data: {
        estatisticas: {
          totalJogos: stats.totalJogos || 0,
          melhorPontuacao: stats.melhorPontuacao || 0,
          tempoTotal: stats.tempoTotal || 0,
          ultimoJogo: stats.ultimoJogo || null,
          jogosPorTipo: jogosPorTipo.reduce((acc, row) => {
            acc[row.jogo] = row.quantidade;
            return acc;
          }, {})
        },
        pontuacoesRecentes
      }
    });

  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    res.status(500).json({ 
      error: 'Erro ao obter estatísticas',
      message: error.message 
    });
  }
};
