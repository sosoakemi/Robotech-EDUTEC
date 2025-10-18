const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getMe, 
  logout, 
  atualizarPerfil, 
  alterarSenha, 
  deletarConta 
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Rotas públicas
router.post('/register', register);
router.post('/login', login);

// Rotas protegidas
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

// Gerenciamento de conta
router.put('/perfil', protect, atualizarPerfil);
router.put('/senha', protect, alterarSenha);
router.delete('/conta', protect, deletarConta);

module.exports = router;

