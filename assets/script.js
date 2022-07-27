console.log('start');
const questions = [
    'What is question 1?',
    'What is question 2?',
    'What is question 3?',
    'What is question 4?',
    'What is question 5?'
];

const options = [
    ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    ['Option 5', 'Option 6', 'Option 7', 'Option 8'],
    ['Option 9', 'Option 10', 'Option 11', 'Option 12'],
    ['Option 13', 'Option 14', 'Option 15', 'Option 16'],
    ['Option 17', 'Option 18', 'Option 19', 'Option 20']
];

const answers = [ 0, 1, 1, 3, 2];

let currentQuestion = 0;
let currentAnswer;
let currentTime = 10;

let score = 0;


let interval;

function startQuiz() {
    const resultsPanel = document.getElementById('resultsPanel');
    resultsPanel.style = 'display: none;';

    const startBtn = document.getElementById('startBtn');
    startBtn.style = 'display: none;';

    const startDiv = document.getElementById('start');
    startDiv.style = 'display: none;';

    console.log('start quiz');
    score = 0;
    currentQuestion = 0;
    currentAnswer = null;
    currentTime = 20;
    const timeLeft = document.getElementById('timeLeft');
    timeLeft.textContent = currentTime;

    interval = setInterval(() => {
        if (currentTime > 0) {
            currentTime = currentTime - 1;
        } else if (currentTime === 0) {
            forceEnd();
        }

        const timeLeft = document.getElementById('timeLeft');
        timeLeft.textContent = currentTime;
        if (currentTime > 10 && currentTime < 20) {
            timeLeft.className = 'text-warning';
        } else if (currentTime <= 10) {
            timeLeft.className = 'text-danger';
        }

    }, 1000);
    setQuestion();
}

function next() {
    console.log(currentAnswer);
    if (!currentAnswer) {
        alert('You must select an answer');
    } else {
        const questionFeedback = document.getElementById('questionFeedback');
        const correct = document.getElementById('correctText');
        const incorrect = document.getElementById('incorrectText');
        questionFeedback.style = '';


        console.log(currentAnswer + ' vs ' + answers[currentQuestion]);
        if (currentAnswer === answers[currentQuestion] + '') {
            incorrect.style = 'display: none;';
            correct.style = '';

            score++;
        } else {

            correct.style = 'display: none;';
            incorrect.style = '';


            currentTime = currentTime - 10;
        }
        currentAnswer = null;
        currentQuestion++;

        if (currentQuestion < questions.length) {
            setQuestion();
        } else {
            forceEnd();
        }
    }
}

function setQuestion() {
    console.log(currentQuestion);
    const questionPanel = document.getElementById('questionPanel');

    const question = document.getElementById('question');
    question.textContent = questions[currentQuestion];

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    for (let i = 0; i < options[currentQuestion].length; i++) {

        const optionButton = document.createElement('button');
        optionButton.className = 'btn btn-primary mt-2';
        optionButton.value = i + '';
        optionButton.id = i + '';
        optionButton.name = i + '';
        optionButton.addEventListener('click', selectAnswer);
        optionButton.innerText = (i + 1) + '. ' + options[currentQuestion][i];
        optionButton.style = 'width: 250px; text-align: left;';

        optionsDiv.appendChild(optionButton);
    }

    questionPanel.innerHTML = '';
    questionPanel.style = '';
    questionPanel.appendChild(question);
    questionPanel.appendChild(optionsDiv);
}

function selectAnswer(i) {
    console.log('select answer: ' + i);
    if (currentAnswer) {
        const current = document.getElementById(currentAnswer);
        current.checked = false;
    }

    const newAnswer = i.target.id;
    const newCurrent = document.getElementById(newAnswer);
    newCurrent.checked = true;
    currentAnswer = newAnswer;
    next();
}

function forceEnd() {
    const questionFeedback = document.getElementById('questionFeedback');
    questionFeedback.style = 'display: none;';

    console.log('force end');

    currentQuestion = questions.length;
    const questionPanel = document.getElementById('questionPanel');
    questionPanel.style = 'display: none;';

    const resultsPanel = document.getElementById('resultsPanel');
    resultsPanel.style = '';
    const userScoreDiv = document.getElementById('userScore');
    userScoreDiv.innerText = score;
    const totalAvailableDiv = document.getElementById('totalAvailable');
    totalAvailableDiv.innerText = questions.length;

    if (interval) {
        clearInterval(interval);
    }
}


const startBtn = document.getElementById('startBtn');
const tryAgainBtn = document.getElementById('tryAgainBtn');

startBtn.addEventListener('click', startQuiz);
tryAgainBtn.addEventListener('click', startQuiz);
