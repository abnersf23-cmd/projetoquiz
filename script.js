const questions = [
  {
    question: "Qual é o nome da torcida do Corinthians?",
    answers: [
      "corinthians",
      "curintia",
      "gaviao",
      "gaviao corinthiano",
      "gavioes da fiel",
      "gavioes",
      "gaveao",
      "gaveoes",
    ],
  },
  {
    question: "Qual é a cor do uniforme do Palmeiras?",
    answers: [
      "verde",
      "verde esmeralda",
      "verde escuro",
      "verde e branco",
      "verdinho",
      "verdi",
      "verde palmeiras",
      "verdao",
    ],
  },
  {
    question: "Quem é o maior vencedor da Bola de Ouro?",
    answers: [
      "lionel messi",
      "messi",
      "argentino",
      "anao do barca",
      "argentino baixinho",
    ],
  },
  {
    question: "Qual é o nome do estádio do Flamengo?",
    answers: ["maracana"],
  },
  {
    question: "Qual é o nome do estádio do São Paulo?",
    answers: ["morumbi", "estadio do morumbi", "cicero pompeu de toledo"],
  },
  {
    question: "Qual é o nome do estádio do Santos?",
    answers: ["vila belmiro", "estadio vila belmiro", "vila belmiro santista"],
  },
  {
    question: "Qual é o nome do estádio do Grêmio?",
    answers: ["arena do gremio", "arena gremio", "arena do gremio porto alegre"],
  },
  {
    question: "Quem foi o maior artilheiro da história do futebol brasileiro?",
    answers: ["pele", "edson arantes do nascimento", "rei pele"],
  },
  {
    question: "Qual é o nome do campeonato de futebol mais importante do Brasil?",
    answers: ["campeonato brasileiro", "brasileirao", "brasileirao serie a", "serie a"],
  },
  {
    question: "Tendo em vista a história do futebol brasileiro, qual é o clube mais antigo do país?",
    answers: ["sport club rio grande", "rio grande", "sport club rio grande do sul"],
  },
];

const introForm = document.getElementById("intro-form");
const answerForm = document.getElementById("answer-form");
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const playerNameInput = document.getElementById("player-name");
const playerLevelInput = document.getElementById("player-level");
const playerDisplay = document.getElementById("player-display");
const scoreDisplay = document.getElementById("score-display");
const totalDisplay = document.getElementById("total-display");
const questionCount = document.getElementById("question-count");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const feedbackBox = document.getElementById("feedback-box");
const progressBar = document.getElementById("progress-bar");
const resultTitle = document.getElementById("result-title");
const resultSummary = document.getElementById("result-summary");
const restartButton = document.getElementById("restart-button");

let currentQuestionIndex = 0;
let score = 0;
let playerName = "";

totalDisplay.textContent = questions.length;
questionCount.textContent = questions.length;

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionNumber.textContent = currentQuestionIndex + 1;
  questionText.textContent = currentQuestion.question;
  answerInput.value = "";
  answerInput.focus();
  feedbackBox.className = "feedback-box hidden";
  progressBar.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;
}

function finishQuiz() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const performance = Math.round((score / questions.length) * 100);

  if (performance === 100) {
    resultTitle.textContent = `Craque demais, ${playerName}!`;
  } else if (performance >= 50) {
    resultTitle.textContent = `${playerName}, você mandou bem!`;
  } else {
    resultTitle.textContent = `${playerName}, bora treinar mais um pouco!`;
  }

  resultSummary.textContent = `Você acertou ${score} de ${questions.length} perguntas e fechou o quiz com ${performance}% de aproveitamento.`;
}

function showFeedback(message, type) {
  feedbackBox.classList.remove("hidden", "success", "error");
  feedbackBox.classList.add(type);
  feedbackBox.textContent = message;
}

introForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = playerNameInput.value.trim();
  const level = Number(playerLevelInput.value);

  if (!name) {
    playerNameInput.focus();
    return;
  }

  if (Number.isNaN(level) || level < 0 || level > 10) {
    playerLevelInput.focus();
    return;
  }

  playerName = name;
  playerDisplay.textContent = name;

  welcomeScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
});

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const currentQuestion = questions[currentQuestionIndex];
  const normalizedAnswer = normalizeText(answerInput.value);
  const isCorrect = currentQuestion.answers.includes(normalizedAnswer);

  if (isCorrect) {
    score += 1;
    scoreDisplay.textContent = score;
    showFeedback(`Parabéns, ${playerName}! Resposta correta.`, "success");
  } else {
    showFeedback("Resposta incorreta. Vamos para a próxima!", "error");
  }

  currentQuestionIndex += 1;
  progressBar.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;

  window.setTimeout(() => {
    if (currentQuestionIndex === 5) {
      showFeedback(`Parcial do jogo: você fez ${score} de 5 pontos até agora.`, "success");

      window.setTimeout(() => {
        showQuestion();
      }, 1800);
      return;
    }

    if (currentQuestionIndex >= questions.length) {
      finishQuiz();
      return;
    }

    showQuestion();
  }, 1200);
});

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  scoreDisplay.textContent = "0";
  playerNameInput.value = "";
  playerLevelInput.value = "";
  resultScreen.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");
  progressBar.style.width = "0%";
  playerNameInput.focus();
});
