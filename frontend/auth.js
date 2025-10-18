/**
 * Módulo de Autenticação
 * Funções utilitárias para gerenciar autenticação no frontend
 */

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5001'
  : window.location.origin;

// Verificar se usuário está autenticado
function isAuthenticated() {
    const token = localStorage.getItem('token');
    return token !== null;
}

// Obter token
function getToken() {
    return localStorage.getItem('token');
}

// Obter dados do usuário
function getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Proteger página (redirecionar para login se não autenticado)
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = '/login.html';
        return false;
    }
    return true;
}

// Fazer requisição autenticada
async function authenticatedFetch(url, options = {}) {
    const token = getToken();
    
    if (!token) {
        throw new Error('Usuário não autenticado');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...(options.headers || {})
    };

    const response = await fetch(url, {
        ...options,
        headers
    });

    // Se 401, token expirado - fazer logout
    if (response.status === 401) {
        logout();
        window.location.href = '/login.html';
        throw new Error('Sessão expirada');
    }

    return response;
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login.html';
}

// Atualizar dados do usuário no localStorage
function updateUser(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
}

// Verificar role do usuário
function hasRole(role) {
    const user = getUser();
    return user && user.role === role;
}

// Verificar se é admin
function isAdmin() {
    return hasRole('admin');
}

// Verificar se é professor
function isTeacher() {
    return hasRole('teacher');
}

// Verificar se é estudante
function isStudent() {
    return hasRole('student');
}

// Buscar perfil atualizado do servidor
async function fetchProfile() {
    try {
        const response = await authenticatedFetch(`${API_URL}/api/auth/me`);
        const data = await response.json();
        
        if (data.success) {
            updateUser(data.data);
            return data.data;
        }
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        return null;
    }
}

// Exibir informações do usuário na página
function displayUserInfo(elementId) {
    const user = getUser();
    const element = document.getElementById(elementId);
    
    if (element && user) {
        element.innerHTML = `
            <div class="user-info">
                <span class="user-name">${user.name}</span>
                <span class="user-role">${getRoleLabel(user.role)}</span>
            </div>
        `;
    }
}

// Obter label da role
function getRoleLabel(role) {
    const labels = {
        'student': 'Estudante',
        'teacher': 'Professor',
        'admin': 'Administrador'
    };
    return labels[role] || role;
}

// Exportar funções (se usar módulos ES6)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isAuthenticated,
        getToken,
        getUser,
        requireAuth,
        authenticatedFetch,
        logout,
        updateUser,
        hasRole,
        isAdmin,
        isTeacher,
        isStudent,
        fetchProfile,
        displayUserInfo,
        getRoleLabel,
        API_URL
    };
}

