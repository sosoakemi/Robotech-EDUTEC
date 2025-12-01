const db = require('../db');
const { query } = require('../lib/database'); 

// @desc    Salvar pontuação do jogo
// @route   POST /api/game/score
// @access  Private
exports.salvarPontuacao = async (req, res) => {
  try {
    const { jogo, pontuacao, tempo, nivel, dadosExtras } = req.body;
    const userId = req.user.id;

    console.log('--- SALVANDO PONTUAÇÃO ---');
    console.log('User ID:', userId);
    console.log('Pontos:', pontuacao);

    if (pontuacao === undefined) {
      return res.status(400).json({ error: 'Pontuação é obrigatória' });
    }

    const user = await db.buscarUsuarioPorId(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const now = new Date();
    
    // Insere na tabela real (robotech_pontuacoes)
    const result = await query(
      'INSERT INTO robotech_pontuacoes (usuario_id, pontos, data_partida) VALUES (?, ?, ?)',
      [userId, parseInt(pontuacao), now]
    );

    const insertedId = result.insertId;

    // Estatísticas básicas
    const [stats] = await query(
      `SELECT 
        COUNT(*) AS totalJogos, 
        MAX(pontos) AS melhorPontuacao, 
        MAX(data_partida) AS ultimoJogo
       FROM robotech_pontuacoes 
       WHERE usuario_id = ?`,
      [userId]
    );

    res.json({
      success: true,
      message: 'Pontuação salva com sucesso',
      data: {
        record: { id: insertedId, pontos: pontuacao },
        estatisticas: {
          totalJogos: stats.totalJogos,
          melhorPontuacao: stats.melhorPontuacao || 0,
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
    const { limite = 10 } = req.query;

    // Garante que é número inteiro
    const limit = Math.max(1, Math.min(parseInt(limite), 100));

    // CORREÇÃO: Usamos ${limit} direto na string em vez de ?
    // Isso evita o erro "Incorrect arguments" do MySQL
    const rows = await query(
      `SELECT 
        id, 
        usuario_id AS userId, 
        pontos AS pontuacao, 
        data_partida AS dataJogo 
       FROM robotech_pontuacoes 
       WHERE usuario_id = ? 
       ORDER BY pontos DESC, data_partida DESC 
       LIMIT ${limit}`, 
      [userId] // Removemos o limit daqui, pois já está no texto acima
    );

    res.json({
      success: true,
      data: {
        pontuacoes: rows
      }
    });

  } catch (error) {
    console.error('Erro ao obter pontuações:', error);
    res.status(500).json({ error: 'Erro ao obter pontuações' });
  }
};

// @desc    Obter ranking geral
// @route   GET /api/game/ranking
// @access  Public
exports.obterRanking = async (req, res) => {
  try {
    const { limite = 10 } = req.query;
    const limit = Math.max(1, Math.min(parseInt(limite), 200));

    // CORREÇÃO: Usamos ${limit} direto na string em vez de ?
    const rows = await query(
      `SELECT 
        p.id, 
        p.pontos AS pontuacao, 
        p.data_partida AS dataJogo,
        u.nome AS nomeUsuario, 
        u.email AS emailUsuario
       FROM robotech_pontuacoes p
       JOIN robotech_usuarios u ON u.id = p.usuario_id
       ORDER BY p.pontos DESC
       LIMIT ${limit}`,
      [] // Array vazio, pois não usamos ? nesta query
    );

    res.json({
      success: true,
      data: {
        ranking: rows
      }
    });

  } catch (error) {
    console.error('Erro ao obter ranking:', error);
    res.status(500).json({ 
        error: 'Erro ao obter ranking', 
        details: error.message 
    });
  }
};

// @desc    Obter estatísticas do usuário
// @route   GET /api/game/stats
// @access  Private
exports.obterEstatisticas = async (req, res) => {
  try {
    const userId = req.user.id;

    const [stats] = await query(
      `SELECT 
        COUNT(*) AS totalJogos, 
        COALESCE(MAX(pontos),0) AS melhorPontuacao, 
        MAX(data_partida) AS ultimoJogo
       FROM robotech_pontuacoes 
       WHERE usuario_id = ?`,
      [userId]
    );

    res.json({
      success: true,
      data: {
        estatisticas: {
          totalJogos: stats.totalJogos || 0,
          melhorPontuacao: stats.melhorPontuacao || 0,
          ultimoJogo: stats.ultimoJogo || null
        }
      }
    });

  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    res.status(500).json({ error: 'Erro ao obter estatísticas' });
  }
};