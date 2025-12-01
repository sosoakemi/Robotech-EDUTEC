// 1. Configuração da URL (Usa a do api-config.js se existir)
const API_URL = (window.APIConfig && window.APIConfig.API_URL) || 'https://backend-edutec.onrender.com';

const botaoRanking = document.getElementById('botao-ranking');
const modalRanking = document.getElementById('modal-ranking');
const fecharRanking = document.getElementById('fechar-ranking');
const corpoRanking = document.getElementById('corpo-ranking');

function abrirModal() {
    if(modalRanking) modalRanking.style.display = 'flex';
    carregarRanking();
}

function fecharModal() {
    if(modalRanking) modalRanking.style.display = 'none';
}

async function carregarRanking() {
    if(!corpoRanking) return;

    corpoRanking.innerHTML = `
        <div class="ranking-carregando">
            <i class="ri-loader-4-line ri-spin"></i>
            <p>Carregando ranking...</p>
        </div>
    `;

    try {
        // CORREÇÃO 1: Rota correta do Backend Novo
        const resposta = await fetch(`${API_URL}/api/game/ranking?limite=20`);
        
        if (!resposta.ok) {
            throw new Error('Erro ao carregar ranking');
        }

        const dados = await resposta.json();
        
        // CORREÇÃO 2: Pegar o array do lugar certo (dados.data.ranking)
        const listaBruta = dados.data ? dados.data.ranking : [];

        // CORREÇÃO 3: "Traduzir" os nomes das colunas do Backend para o Frontend
        // Backend manda: nomeUsuario, pontuacao
        // Frontend espera: nome, pontuacaoTotal
        const rankingAdaptado = listaBruta.map(item => ({
            usuarioId: item.id,
            nome: item.nomeUsuario || 'Anônimo',
            pontuacaoTotal: item.pontuacao || 0,
            melhorPontuacao: item.pontuacao || 0,
            totalJogos: 1 // O backend simples não agrupa contagem ainda, então deixamos 1
        }));
        
        exibirRanking(rankingAdaptado);

    } catch (erro) {
        corpoRanking.innerHTML = `
            <div class="ranking-erro">
                <i class="ri-error-warning-line"></i>
                <p>Erro ao carregar ranking.</p>
                <small>${erro.message}</small>
            </div>
        `;
        console.error('Erro ao carregar ranking:', erro);
    }
}

function exibirRanking(ranking) {
    if (!ranking || ranking.length === 0) {
        corpoRanking.innerHTML = `
            <div class="ranking-vazio">
                <i class="ri-inbox-line"></i>
                <p>Nenhum jogador ainda. Seja o primeiro!</p>
            </div>
        `;
        return;
    }

    // Tenta pegar o usuário atual para destacar na lista
    let usuarioAtual = null;
    try {
        usuarioAtual = JSON.parse(sessionStorage.getItem('usuarioAtual') || 'null');
    } catch(e) {}
    
    // Tenta pegar o ID, compatível com o formato antigo ou novo
    const usuarioAtualEmail = usuarioAtual ? usuarioAtual.email : null;

    const html = `
        <div class="ranking-header-info">
            <p class="ranking-subtitulo">Top Jogadores</p>
        </div>
        <div class="ranking-lista">
            ${ranking.map((jogador, index) => {
                const posicao = index + 1;
                const medalha = posicao === 1 ? '🥇' : posicao === 2 ? '🥈' : posicao === 3 ? '🥉' : '';
                
                // Verifica se é o usuário atual (pelo nome ou algum identificador único se tiver)
                // Como não temos ID confiável no front antigo, não destacamos para evitar erro
                const isUsuarioAtual = false; 
                
                const classePodio = posicao <= 3 ? `ranking-item-podio ranking-item-p${posicao}` : '';
                
                return `
                    <div class="ranking-item ${isUsuarioAtual ? 'ranking-item-atual' : ''} ${classePodio}" data-posicao="${posicao}">
                        <div class="ranking-posicao">
                            ${medalha || `<span class="ranking-numero">${posicao}º</span>`}
                        </div>
                        <div class="ranking-info">
                            <div class="ranking-nome">
                                <span class="ranking-nome-texto">${jogador.nome}</span>
                            </div>
                            <div class="ranking-detalhes">
                                <span class="ranking-pontos-principal">
                                    <i class="ri-star-fill"></i>
                                    <strong>${(jogador.pontuacaoTotal || 0).toLocaleString('pt-BR')}</strong>
                                    <span class="ranking-pontos-label">pontos</span>
                                </span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;

    corpoRanking.innerHTML = html;
}

// Event Listeners
if (botaoRanking) {
    botaoRanking.addEventListener('click', abrirModal);
}

if (fecharRanking) {
    fecharRanking.addEventListener('click', fecharModal);
}

if (modalRanking) {
    modalRanking.addEventListener('click', (e) => {
        if (e.target === modalRanking) {
            fecharModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalRanking && modalRanking.style.display === 'flex') {
        fecharModal();
    }
});