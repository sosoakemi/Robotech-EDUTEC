const db = require('../db');

// @desc    Salvar pontuação do jogo
// @route   POST /api/game/score
// @access  Private
exports.salvarPontuacao = async (req, res) => {
  try {
    const { jogo, pontuacao, tempo, nivel, dadosExtras } = req.body;
    const userId = req.user._id;

    // Validar dados
    if (!jogo || pontuacao === undefined) {
      return res.status(400).json({ 
        error: 'Jogo e pontuação são obrigatórios' 
      });
    }

    // Buscar usuário
    const user = db.buscarUsuarioPorId(userId);
    if (!user) {
      return res.status(404).json({ 
        error: 'Usuário não encontrado' 
      });
    }

    // Criar registro do jogo
    const gameRecord = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      jogo,
      pontuacao: parseInt(pontuacao),
      tempo: tempo || null,
      nivel: nivel || null,
      dadosExtras: dadosExtras || {},
      dataJogo: new Date().toISOString(),
      usuarioId: userId
    };

    // Inicializar gameData se não existir
    if (!user.gameData) {
      user.gameData = {
        pontuacoes: [],
        estatisticas: {
          totalJogos: 0,
          melhorPontuacao: 0,
          tempoTotal: 0,
          ultimoJogo: null
        }
      };
    }

    // Adicionar pontuação
    user.gameData.pontuacoes.push(gameRecord);

    // Atualizar estatísticas
    user.gameData.estatisticas.totalJogos += 1;
    user.gameData.estatisticas.ultimoJogo = new Date().toISOString();
    
    if (pontuacao > user.gameData.estatisticas.melhorPontuacao) {
      user.gameData.estatisticas.melhorPontuacao = pontuacao;
    }

    if (tempo) {
      user.gameData.estatisticas.tempoTotal += parseInt(tempo);
    }

    // Manter apenas as últimas 50 pontuações
    if (user.gameData.pontuacoes.length > 50) {
      user.gameData.pontuacoes = user.gameData.pontuacoes.slice(-50);
    }

    // Salvar no banco
    const usuarioAtualizado = db.atualizarUsuario(userId, { gameData: user.gameData });

    res.json({
      success: true,
      message: 'Pontuação salva com sucesso',
      data: {
        record: gameRecord,
        estatisticas: user.gameData.estatisticas
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
    const userId = req.user._id;
    const { jogo, limite = 10 } = req.query;

    // Buscar usuário
    const user = db.buscarUsuarioPorId(userId);
    if (!user) {
      return res.status(404).json({ 
        error: 'Usuário não encontrado' 
      });
    }

    let pontuacoes = user.gameData?.pontuacoes || [];

    // Filtrar por jogo se especificado
    if (jogo) {
      pontuacoes = pontuacoes.filter(p => p.jogo === jogo);
    }

    // Ordenar por pontuação (maior primeiro)
    pontuacoes.sort((a, b) => b.pontuacao - a.pontuacao);

    // Limitar resultados
    pontuacoes = pontuacoes.slice(0, parseInt(limite));

    res.json({
      success: true,
      data: {
        pontuacoes,
        estatisticas: user.gameData?.estatisticas || {
          totalJogos: 0,
          melhorPontuacao: 0,
          tempoTotal: 0,
          ultimoJogo: null
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

    // Buscar todos os usuários
    const usuarios = db.buscarTodosUsuarios();
    
    // Coletar todas as pontuações
    let todasPontuacoes = [];
    
    usuarios.forEach(usuario => {
      if (usuario.gameData?.pontuacoes) {
        usuario.gameData.pontuacoes.forEach(pontuacao => {
          if (!jogo || pontuacao.jogo === jogo) {
            todasPontuacoes.push({
              ...pontuacao,
              nomeUsuario: usuario.name,
              emailUsuario: usuario.email
            });
          }
        });
      }
    });

    // Ordenar por pontuação (maior primeiro)
    todasPontuacoes.sort((a, b) => b.pontuacao - a.pontuacao);

    // Limitar resultados
    todasPontuacoes = todasPontuacoes.slice(0, parseInt(limite));

    res.json({
      success: true,
      data: {
        ranking: todasPontuacoes,
        totalJogadores: usuarios.length,
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
    const userId = req.user._id;

    // Buscar usuário
    const user = db.buscarUsuarioPorId(userId);
    if (!user) {
      return res.status(404).json({ 
        error: 'Usuário não encontrado' 
      });
    }

    const gameData = user.gameData || {
      pontuacoes: [],
      estatisticas: {
        totalJogos: 0,
        melhorPontuacao: 0,
        tempoTotal: 0,
        ultimoJogo: null
      }
    };

    // Calcular estatísticas adicionais
    const pontuacoes = gameData.pontuacoes || [];
    const estatisticas = {
      ...gameData.estatisticas,
      pontuacaoMedia: pontuacoes.length > 0 
        ? Math.round(pontuacoes.reduce((sum, p) => sum + p.pontuacao, 0) / pontuacoes.length)
        : 0,
      jogosPorTipo: {}
    };

    // Contar jogos por tipo
    pontuacoes.forEach(p => {
      estatisticas.jogosPorTipo[p.jogo] = (estatisticas.jogosPorTipo[p.jogo] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        estatisticas,
        pontuacoesRecentes: pontuacoes.slice(-5).reverse()
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

