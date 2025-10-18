const express = require('express');
const router = express.Router();
const { 
  salvarPontuacao, 
  obterPontuacoes, 
  obterRanking, 
  obterEstatisticas 
} = require('../controllers/gameController');
const { protect } = require('../middleware/auth');

// Rotas protegidas (precisam de login)
router.post('/score', protect, salvarPontuacao);
router.get('/scores', protect, obterPontuacoes);
router.get('/stats', protect, obterEstatisticas);

// Rota pública (não precisa de login)
router.get('/ranking', obterRanking);

module.exports = router;

