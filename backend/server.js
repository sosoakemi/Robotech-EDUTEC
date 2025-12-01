require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importar os Controllers que criamos (eles conversam com o MySQL)
const authController = require('./controllers/authController');
const gameController = require('./controllers/gameController'); // Certifique-se que o arquivo existe


const { protect } = require('./middleware/auth');

const app = express();
const PORTA = process.env.PORT || 5001; // Render usa a porta 10000 ou a que definirmos

// Configuração do CORS (Importante para o Frontend acessar)
app.use(cors());
app.use(express.json()); // Permite ler JSON do frontend

// --- ROTA DE TESTE ---
app.get('/', (req, res) => {
  res.json({ mensagem: 'API RoboTech rodando com MySQL no Render 🚀' });
});

// ==========================================
// ROTAS DE AUTENTICAÇÃO (MySQL)
// ==========================================
// Mapeamos para bater com o que seu Frontend espera (/api/auth/...)

app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.get('/api/auth/me', protect, authController.getMe);
app.post('/api/auth/logout', authController.logout);
app.put('/api/auth/perfil', protect, authController.atualizarPerfil);
app.put('/api/auth/senha', protect, authController.alterarSenha);
app.delete('/api/auth/conta', protect, authController.deletarConta);
app.post('/api/auth/recuperar-senha', authController.recuperarSenha);

// ==========================================
// ROTAS DO JOGO (MySQL)
// ==========================================
// O frontend chama /api/game/score, etc.

app.post('/api/game/score', protect, gameController.salvarPontuacao);
app.get('/api/game/scores', protect, gameController.obterPontuacoes);
app.get('/api/game/ranking', gameController.obterRanking); // Público, não precisa de protect
app.get('/api/game/stats', protect, gameController.obterEstatisticas);


// ==========================================
// INICIALIZAÇÃO
// ==========================================
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
  console.log(`Banco de Dados: ${process.env.DB_HOST}`);
});