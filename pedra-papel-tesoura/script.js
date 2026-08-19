// Configurações
const limiteVitorias = 5;
let vitoriasP1 = 0, vitoriasP2 = 0, empates = 0;
let escolhaP1 = null, escolhaP2 = null;
let modo = null;
let historico = [];

// Inicia jogo (mostra escolha de modo)
function iniciarJogo() {
  document.getElementById("menuInicial").style.display = "none";
  document.getElementById("modoJogo").style.display = "block";
}

// Escolhe modo de jogo
function escolherModo(m) {
  modo = m;
  document.getElementById("modoJogo").style.display = "none";
  document.getElementById("gameArea").style.display = "block";

  if (modo === "cpu") {
    document.getElementById("player2Btns").style.display = "none";
  } else {
    document.getElementById("player2Btns").style.display = "block";
  }
}

// Mostra histórico
function mostrarHistorico() {
  document.getElementById("historico").style.display = "block";
  document.getElementById("historico").innerHTML = historico.join("<br>");
}

// Jogar
function jogar(escolha, player) {
  if (modo === "cpu") {
    escolhaP1 = escolha;
    const opcoes = ["pedra","papel","tesoura"];
    escolhaP2 = opcoes[Math.floor(Math.random()*3)];
    verificarResultado();
  } else {
    if (player === "p1") escolhaP1 = escolha;
    if (player === "p2") escolhaP2 = escolha;

    if (escolhaP1 && escolhaP2) {
      verificarResultado();
      escolhaP1 = null;
      escolhaP2 = null;
    }
  }
}

// Verifica resultado
function verificarResultado() {
  let resultado = "";

  if (escolhaP1 === escolhaP2) {
    resultado = "Empate!";
    empates++;
  } else if (
    (escolhaP1 === "pedra" && escolhaP2 === "tesoura") ||
    (escolhaP1 === "papel" && escolhaP2 === "pedra") ||
    (escolhaP1 === "tesoura" && escolhaP2 === "papel")
  ) {
    resultado = "Player 1 venceu!";
    vitoriasP1++;
  } else {
    resultado = modo === "cpu" ? "Computador venceu!" : "Player 2 venceu!";
    vitoriasP2++;
  }

  // Atualiza resultado
  document.getElementById("resultado").textContent = resultado;

  // Atualiza escolhas
  document.getElementById("escolhas").innerHTML =
    `P1 escolheu: ${escolhaP1} | ${modo === "cpu" ? "CPU" : "P2"} escolheu: ${escolhaP2}`;

  // Atualiza placar
  document.getElementById("placar").textContent =
    `P1 Vitórias: ${vitoriasP1} | ${modo === "cpu" ? "CPU" : "P2"} Vitórias: ${vitoriasP2} | Empates: ${empates}`;

  // Verifica fim de jogo
  if (vitoriasP1 >= limiteVitorias || vitoriasP2 >= limiteVitorias) {
    encerrarPartida();
  }
}

// Encerrar partida
function encerrarPartida() {
  let vencedorFinal = vitoriasP1 > vitoriasP2 
    ? "Player 1 ganhou a partida!" 
    : (modo === "cpu" ? "Computador ganhou a partida!" : "Player 2 ganhou a partida!");

  document.getElementById("resultado").textContent = vencedorFinal;
  historico.push(vencedorFinal);

  // Desabilita botões
  document.querySelectorAll("#gameArea button").forEach(btn => btn.disabled = true);

  // Mostra botão de voltar
  document.getElementById("voltarInicio").style.display = "block";
}

function voltarInicio() {
  // Reseta placar
  vitoriasP1 = 0;
  vitoriasP2 = 0;
  empates = 0;
  escolhaP1 = null;
  escolhaP2 = null;

  // Limpa textos
  document.getElementById("resultado").textContent = "";
  document.getElementById("escolhas").textContent = "";
  document.getElementById("placar").textContent = "";

  // Reabilita botões
  document.querySelectorAll("#gameArea button").forEach(btn => btn.disabled = false);

  // Esconde áreas e volta ao menu inicial
  document.getElementById("gameArea").style.display = "none";
  document.getElementById("modoJogo").style.display = "none";
  document.getElementById("voltarInicio").style.display = "none";
  document.getElementById("menuInicial").style.display = "block";
}

