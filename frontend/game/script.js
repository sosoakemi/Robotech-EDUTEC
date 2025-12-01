const cards = document.querySelectorAll(`.memory-card`);

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add(`flip`);

    if (!hasFlippedCard) {
        
        hasFlippedCard = true;
        firstCard = this;

        return;
    }


    
    secondCard = this; 
        
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}
    

function disableCards(){
    firstCard.removeEventListener(`click`, flipCard);
    secondCard.removeEventListener(`click`, flipCard);

    resetBoard();
}

function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove(`flip`);
        secondCard.classList.remove(`flip`);

        resetBoard();
        }, 1500);
}

function resetBoard() {
    hasFlippedCard = false; 
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener(`click`, flipCard));

     
      //jogo da memoria
        let nivelAtualQuest = 1;
        let pontuacaoQuest = 0;
        let totalNiveisQuest = 5;

        const desafiosQuest = [
            {
                titulo: "Olá, Mundo!",
                descricao: "Sua missão é criar uma função que retorna 'Olá, Mundo!'.",
                saidaEsperada: "Olá, Mundo!",
                dica: "Use a palavra-chave 'return' seguida da string \"Olá, Mundo!\" dentro da função.",
                modelo: "function minhaFuncao() {\n    // Seu código aqui\n}",
                funcaoTeste: (codigo) => {
                    try {
                        eval(codigo);
                        return minhaFuncao() === "Olá, Mundo!";
                    } catch (e) {
                        return false;
                    }
                }
            },
            {
                titulo: "Somador Básico",
                descricao: "Crie uma função que recebe dois números e retorna a soma deles.",
                saidaEsperada: "soma(5, 3) deve retornar 8",
                dica: "Use os parâmetros da função e o operador '+' para somar os números.",
                modelo: "function soma(a, b) {\n    // Seu código aqui\n}",
                funcaoTeste: (codigo) => {
                    try {
                        eval(codigo);
                        return soma(5, 3) === 8 && soma(10, 7) === 17;
                    } catch (e) {
                        return false;
                    }
                }
            },
            {
                titulo: "Verificador de Par/Ímpar",
                descricao: "Crie uma função que verifica se um número é par ou ímpar.",
                saidaEsperada: "ehPar(4) deve retornar true, ehPar(7) deve retornar false",
                dica: "Use o operador módulo (%) para verificar se o resto da divisão por 2 é zero.",
                modelo: "function ehPar(numero) {\n    // Seu código aqui\n}",
                funcaoTeste: (codigo) => {
                    try {
                        eval(codigo);
                        return ehPar(4) === true && ehPar(7) === false && ehPar(0) === true;
                    } catch (e) {
                        return false;
                    }
                }
            },
            {
                titulo: "Contador de Caracteres",
                descricao: "Crie uma função que conta quantos caracteres tem uma string.",
                saidaEsperada: "contarCaracteres('JavaScript') deve retornar 10",
                dica: "Use a propriedade '.length' das strings para contar os caracteres.",
                modelo: "function contarCaracteres(texto) {\n    // Seu código aqui\n}",
                funcaoTeste: (codigo) => {
                    try {
                        eval(codigo);
                        return contarCaracteres('JavaScript') === 10 && contarCaracteres('Olá') === 3;
                    } catch (e) {
                        return false;
                    }
                }
            },
            {
                titulo: "Maior de Três",
                descricao: "Crie uma função que retorna o maior de três números.",
                saidaEsperada: "maiorDeTres(10, 5, 8) deve retornar 10",
                dica: "Use Math.max() ou condicionais if/else para comparar os números.",
                modelo: "function maiorDeTres(a, b, c) {\n    // Seu código aqui\n}",
                funcaoTeste: (codigo) => {
                    try {
                        eval(codigo);
                        return maiorDeTres(10, 5, 8) === 10 && maiorDeTres(1, 9, 3) === 9;
                    } catch (e) {
                        return false;
                    }
                }
            }
        ];

        function atualizarInterfaceQuest() {
            const desafio = desafiosQuest[nivelAtualQuest - 1];
            document.getElementById('numero-nivel-quest').textContent = `Nível ${nivelAtualQuest}`;
            document.getElementById('pontuacao-quest').textContent = `Pontos: ${pontuacaoQuest}`;
            document.getElementById('texto-desafio-quest').textContent = desafio.descricao;
            document.getElementById('saida-esperada-quest').textContent = `Resultado esperado: ${desafio.saidaEsperada}`;
            document.getElementById('editor-codigo-quest').value = desafio.modelo;
            document.getElementById('texto-dica-quest').textContent = desafio.dica;
            document.getElementById('preenchimento-progresso-quest').style.width = `${(nivelAtualQuest / totalNiveisQuest) * 100}%`;
            document.getElementById('painel-dica-quest').style.display = 'none';
            document.getElementById('botao-proximo-quest').style.display = 'none';
            document.getElementById('saida-quest').textContent = 'Clique em "Executar" para testar seu código...';
            document.getElementById('saida-quest').className = 'saida';
        }

        function executarCodigoQuest() {
            const codigo = document.getElementById('editor-codigo-quest').value;
            const desafio = desafiosQuest[nivelAtualQuest - 1];
            const saida = document.getElementById('saida-quest');

            try {
                if (desafio.funcaoTeste(codigo)) {
                    saida.textContent = '✅ Parabéns! Seu código está correto!';
                    saida.className = 'saida sucesso';
                    pontuacaoQuest += 100;
                    document.getElementById('pontuacao-quest').textContent = `Pontos: ${pontuacaoQuest}`;
                    document.getElementById('botao-proximo-quest').style.display = 'flex';
                    document.getElementById('celebracao-quest').style.display = 'block';
                } else {
                    saida.textContent = '❌ Resultado incorreto. Tente novamente!';
                    saida.className = 'saida erro';
                }
            } catch (erro) {
                saida.textContent = `❌ Erro no código:\n${erro.message}`;
                saida.className = 'saida erro';
            }
        }

        function mostrarDicaQuest() {
            const painelDica = document.getElementById('painel-dica-quest');
            painelDica.style.display = painelDica.style.display === 'none' ? 'block' : 'none';
        }

        async function salvarPontuacao() {
            const usuarioAtual = JSON.parse(sessionStorage.getItem('usuarioAtual') || 'null');
            if (!usuarioAtual || !usuarioAtual.id) {
                console.log('Usuário não logado, pontuação não será salva.');
                return;
            }

            const API_URL = document.body.getAttribute('data-api-url') || 'https://backend-edutec.onrender.com';
            
            try {
                const resposta = await fetch(`${API_URL}/usuarios/${usuarioAtual.id}/jogos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        jogo: 'coderobotech',
                        pontuacao: pontuacaoQuest,
                        nivel: nivelAtualQuest,
                        observacoes: `Completou ${nivelAtualQuest} níveis`
                    })
                });

                if (resposta.ok) {
                    console.log('Pontuação salva com sucesso!');
                } else {
                    console.error('Erro ao salvar pontuação');
                }
            } catch (erro) {
                console.error('Erro ao salvar pontuação:', erro);
            }
        }

        function proximoNivelQuest() {
            document.getElementById('celebracao-quest').style.display = 'none';
            
            if (nivelAtualQuest < totalNiveisQuest) {
                nivelAtualQuest++;
                atualizarInterfaceQuest();
            } else {
               
                document.getElementById('saida-quest').innerHTML = '🎉 Parabéns! Você completou todos os desafios do CodeQuest!\n\nPontuação final: ' + pontuacaoQuest + ' pontos';
                document.getElementById('saida-quest').className = 'saida sucesso';
                
                const btnExec = document.getElementById('botao-executar-quest');
                if (btnExec) btnExec.disabled = true;
                salvarPontuacao();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        }

        
        document.getElementById('botao-executar-quest').addEventListener('click', executarCodigoQuest);
        document.getElementById('botao-dica-quest').addEventListener('click', mostrarDicaQuest);
        document.getElementById('botao-proximo-quest').addEventListener('click', proximoNivelQuest);

       
        atualizarInterfaceQuest();