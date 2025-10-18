const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.json');

// Função para ler o banco de dados
function lerDB() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Se o arquivo não existir, cria um novo
    const db = { usuarios: [] };
    salvarDB(db);
    return db;
  }
}

// Função para salvar no banco de dados
function salvarDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Erro ao salvar banco de dados:', error);
    return false;
  }
}

// Buscar todos os usuários
function buscarTodosUsuarios() {
  const db = lerDB();
  return db.usuarios;
}

// Buscar usuário por email
function buscarUsuarioPorEmail(email) {
  const db = lerDB();
  return db.usuarios.find(u => u.email === email);
}

// Buscar usuário por ID
function buscarUsuarioPorId(id) {
  const db = lerDB();
  return db.usuarios.find(u => u._id === id);
}

// Criar novo usuário
function criarUsuario(usuario) {
  const db = lerDB();
  
  // Gerar ID único
  usuario._id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
  usuario.createdAt = new Date().toISOString();
  usuario.isActive = true;
  usuario.lastLogin = null;
  
  db.usuarios.push(usuario);
  salvarDB(db);
  
  return usuario;
}

// Atualizar usuário
function atualizarUsuario(id, dadosAtualizados) {
  const db = lerDB();
  const index = db.usuarios.findIndex(u => u._id === id);
  
  if (index === -1) return null;
  
  db.usuarios[index] = { ...db.usuarios[index], ...dadosAtualizados };
  salvarDB(db);
  
  return db.usuarios[index];
}

// Deletar usuário
function deletarUsuario(id) {
  const db = lerDB();
  const index = db.usuarios.findIndex(u => u._id === id);
  
  if (index === -1) return false;
  
  db.usuarios.splice(index, 1);
  salvarDB(db);
  
  return true;
}

module.exports = {
  lerDB,
  salvarDB,
  buscarTodosUsuarios,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
};

