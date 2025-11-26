require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcryptjs');
const { randomUUID } = require('crypto');

const app = express();
const PORTA = process.env.PORT || 5001;
const ARQUIVO_BANCO = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());

async function lerBanco() {
  try {
    const dados = await fs.readFile(ARQUIVO_BANCO, 'utf8');
    return JSON.parse(dados);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      const inicial = { usuarios: [] };
      await fs.writeFile(ARQUIVO_BANCO, JSON.stringify(inicial, null, 2));
      return inicial;
    }
    throw erro;
  }
}

async function salvarBanco(dados) {
  await fs.writeFile(ARQUIVO_BANCO, JSON.stringify(dados, null, 2));
}

function limparUsuario(usuario) {
  const { senhaHash, ...restante } = usuario;
  return restante;
}

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API RoboTech simples funcionando',
    recursos: {
      cadastro: 'POST /usuarios',
      jogos: 'POST /usuarios/:id/jogos',
      alterarSenha: 'PUT /usuarios/:id/senha',
      excluirConta: 'DELETE /usuarios/:id'
    }
  });
});

app.post('/usuarios', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Informe nome, email e senha.' });
  }

  const banco = await lerBanco();
  const jaExiste = banco.usuarios.find((u) => u.email === email.toLowerCase());

  if (jaExiste) {
    return res.status(409).json({ erro: 'Já existe usuário com este email.' });
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const novoUsuario = {
    id: randomUUID(),
    nome,
    email: email.toLowerCase(),
    senhaHash,
    jogos: [],
    criadoEm: new Date().toISOString()
  };

  banco.usuarios.push(novoUsuario);
  await salvarBanco(banco);

  res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.', usuario: limparUsuario(novoUsuario) });
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Informe email e senha.' });
  }

  const banco = await lerBanco();
  const usuario = banco.usuarios.find((u) => u.email === email.toLowerCase());

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  const senhaConfere = await bcrypt.compare(senha, usuario.senhaHash);

  if (!senhaConfere) {
    return res.status(401).json({ erro: 'Senha inválida.' });
  }

  usuario.ultimoLogin = new Date().toISOString();
  await salvarBanco(banco);

  res.json({ mensagem: 'Login realizado com sucesso.', usuario: limparUsuario(usuario) });
});

app.post('/recuperar-senha', async (req, res) => {
  const { email, novaSenha } = req.body;

  if (!email || !novaSenha) {
    return res.status(400).json({ erro: 'Informe email e nova senha.' });
  }

  const banco = await lerBanco();
  const usuario = banco.usuarios.find((u) => u.email === email.toLowerCase());

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado com este email.' });
  }

  usuario.senhaHash = await bcrypt.hash(novaSenha, 10);
  usuario.senhaAlteradaEm = new Date().toISOString();
  await salvarBanco(banco);

  res.json({ mensagem: 'Senha redefinida com sucesso.' });
});

app.post('/usuarios/:id/jogos', async (req, res) => {
  const { id } = req.params;
  const { jogo, pontuacao, tempo, nivel, observacoes } = req.body;

  if (!jogo || pontuacao === undefined) {
    return res.status(400).json({ erro: 'Informe pelo menos o nome do jogo e a pontuação.' });
  }

  const banco = await lerBanco();
  const usuario = banco.usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  const registroJogo = {
    id: randomUUID(),
    jogo,
    pontuacao,
    tempo: tempo || null,
    nivel: nivel || null,
    observacoes: observacoes || null,
    registradoEm: new Date().toISOString()
  };

  usuario.jogos.push(registroJogo);
  await salvarBanco(banco);

  res.json({ mensagem: 'Informações do jogo salvas.', jogo: registroJogo });
});

app.put('/usuarios/:id/senha', async (req, res) => {
  const { id } = req.params;
  const { senhaAtual, novaSenha } = req.body;

  if (!senhaAtual || !novaSenha) {
    return res.status(400).json({ erro: 'Informe a senha atual e a nova senha.' });
  }

  const banco = await lerBanco();
  const usuario = banco.usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  const senhaConfere = await bcrypt.compare(senhaAtual, usuario.senhaHash);

  if (!senhaConfere) {
    return res.status(401).json({ erro: 'Senha atual inválida.' });
  }

  usuario.senhaHash = await bcrypt.hash(novaSenha, 10);
  usuario.senhaAlteradaEm = new Date().toISOString();
  await salvarBanco(banco);

  res.json({ mensagem: 'Senha atualizada com sucesso.' });
});

app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;

  const banco = await lerBanco();
  const indice = banco.usuarios.findIndex((u) => u.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  const [removido] = banco.usuarios.splice(indice, 1);
  await salvarBanco(banco);

  res.json({ mensagem: 'Conta removida com sucesso.', usuario: limparUsuario(removido) });
});

app.get('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const banco = await lerBanco();
  const usuario = banco.usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  res.json({ usuario: limparUsuario(usuario) });
});

app.get('/ranking/coderobotech', async (req, res) => {
  try {
    const banco = await lerBanco();
    const ranking = [];

    banco.usuarios.forEach((usuario) => {
      if (!usuario.jogos || usuario.jogos.length === 0) return;

      const jogosCoderobotech = usuario.jogos.filter((j) => 
        j.jogo && j.jogo.toLowerCase() === 'coderobotech'
      );

      if (jogosCoderobotech.length === 0) return;

      const pontuacaoTotal = jogosCoderobotech.reduce((soma, j) => soma + (j.pontuacao || 0), 0);
      const melhorPontuacao = jogosCoderobotech.length > 0 
        ? Math.max(...jogosCoderobotech.map((j) => j.pontuacao || 0))
        : 0;
      const totalJogos = jogosCoderobotech.length;

      ranking.push({
        usuarioId: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        pontuacaoTotal,
        melhorPontuacao,
        totalJogos,
        ultimoJogo: jogosCoderobotech[jogosCoderobotech.length - 1].registradoEm
      });
    });

    ranking.sort((a, b) => b.pontuacaoTotal - a.pontuacaoTotal);

    res.json({ ranking: ranking.slice(0, 50) });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar ranking.' });
  }
});

app.listen(PORTA, () => {
  console.log(`Servidor simples iniciado na porta ${PORTA}`);
});