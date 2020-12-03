const startButton = document.getElementById('btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex;
const storedNames = JSON.parse(localStorage.getItem('questions'));

startButton.addEventListener('click', beginGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
    nextButton.classList.add('hide');
  })

function beginGame() {
    startButton.classList.add('hide');
    shuffledQuestions = storedNames.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
} 

function setNextQuestion() {
    currentQuestionIndex++;
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.content.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
      nextButton.classList.remove('hide');
    }
  }

function selectAnswer(e) {
    const selectedAnswer = e.target;
    let question = shuffledQuestions[currentQuestionIndex];
    let currentPrize = document.getElementById('current-prize');
    let totalPrize = document.getElementById('total-prize');
    if (question.content.indexOf(selectedAnswer.innerText) === question.correct) {
        totalPrize.innerText = parseInt(totalPrize.innerText) + parseInt(currentPrize.innerText);
        currentPrize.innerText = parseInt(currentPrize.innerText) * 2;
        setNextQuestion();
    } else {
        questionContainerElement.classList.add('hide');
        const loser = document.querySelector('.lost');
        loser.classList.remove('lost-hide');
        const totalPrizeWon = document.getElementById('total-prize-won');
        totalPrizeWon.innerText = totalPrize.innerText;
    }
    let million = 1000000;
    if (totalPrize.innerText > million) {
        questionContainerElement.classList.add('hide');
        const won = document.querySelector('.won');
        won.classList.remove('won-hide');
    } 
}