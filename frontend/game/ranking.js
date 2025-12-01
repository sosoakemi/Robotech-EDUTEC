// 1. Tenta pegar a configuração global (api-config.js)
// 2. Se falhar, usa o link do Render como segurança
const API_URL = (window.APIConfig && window.APIConfig.API_URL) || 'https://backend-edutec.onrender.com';

const botaoRanking = document.getElementById('botao-ranking');
const modalRanking = document.getElementById('modal-ranking');
const fecharRanking = document.getElementById('fechar-ranking');
const corpoRanking = document.getElementById('corpo-ranking');

function abrirModal() {
    modalRanking.style.display = 'flex';
    carregarRanking();
}

function fecharModal() {
    modalRanking.style.display = 'none';
}

async function carregarRanking() {
    corpoRanking.innerHTML = `
        <div class="ranking-carregando">
            <i class="ri-loader-4-line ri-spin"></i>
            <p>Carregando ranking...</p>
        </div>
    `;

    try {
        const resposta = await fetch(`${API_URL}/ranking/coderobotech`);
        
        if (!resposta.ok) {
            throw new Error('Erro ao carregar ranking');
        }

        const dados = await resposta.json();
        exibirRanking(dados.ranking || []);
    } catch (erro) {
        corpoRanking.innerHTML = `
            <div class="ranking-erro">
                <i class="ri-error-warning-line"></i>
                <p>Erro ao carregar ranking. Tente novamente mais tarde.</p>
            </div>
        `;
        console.error('Erro ao carregar ranking:', erro);
    }
}

function exibirRanking(ranking) {
    if (ranking.length === 0) {
        corpoRanking.innerHTML = `
            <div class="ranking-vazio">
                <i class="ri-inbox-line"></i>
                <p>Nenhum jogador ainda. Seja o primeiro!</p>
            </div>
        `;
        return;
    }

    const usuarioAtual = JSON.parse(sessionStorage.getItem('usuarioAtual') || 'null');
    const usuarioAtualId = usuarioAtual ? usuarioAtual.id : null;

    const html = `
        <div class="ranking-header-info">
            <p class="ranking-subtitulo">Top jogadores do CodeRoboTech</p>
            <p class="ranking-total">${ranking.length} ${ranking.length === 1 ? 'jogador' : 'jogadores'}</p>
        </div>
        <div class="ranking-lista">
            ${ranking.map((jogador, index) => {
                const posicao = index + 1;
                const medalha = posicao === 1 ? '🥇' : posicao === 2 ? '🥈' : posicao === 3 ? '🥉' : '';
                const isUsuarioAtual = jogador.usuarioId === usuarioAtualId;
                const classePodio = posicao <= 3 ? `ranking-item-podio ranking-item-p${posicao}` : '';
                
                return `
                    <div class="ranking-item ${isUsuarioAtual ? 'ranking-item-atual' : ''} ${classePodio}" data-posicao="${posicao}">
                        <div class="ranking-posicao">
                            ${medalha || `<span class="ranking-numero">${posicao}º</span>`}
                        </div>
                        <div class="ranking-info">
                            <div class="ranking-nome">
                                <span class="ranking-nome-texto">${jogador.nome}</span>
                                ${isUsuarioAtual ? '<span class="ranking-badge">Você</span>' : ''}
                            </div>
                            <div class="ranking-detalhes">
                                <span class="ranking-pontos-principal">
                                    <i class="ri-star-fill"></i>
                                    <strong>${jogador.pontuacaoTotal.toLocaleString('pt-BR')}</strong>
                                    <span class="ranking-pontos-label">pontos totais</span>
                                </span>
                                <span class="ranking-pontos-secundario">
                                    <i class="ri-trophy-line"></i>
                                    Melhor: <strong>${jogador.melhorPontuacao.toLocaleString('pt-BR')}</strong>
                                </span>
                                <span class="ranking-jogos">
                                    <i class="ri-gamepad-line"></i>
                                    ${jogador.totalJogos} ${jogador.totalJogos === 1 ? 'jogo' : 'jogos'}
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
    if (e.key === 'Escape' && modalRanking.style.display === 'flex') {
        fecharModal();
    }
});

