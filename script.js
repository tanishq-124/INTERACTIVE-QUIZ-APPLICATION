// Quiz class to manage quiz functionality
class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
    }
    
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    
    answerQuestion(answerIndex) {
        const currentQuestion = this.getCurrentQuestion();
        this.userAnswers[this.currentQuestionIndex] = answerIndex;
        
        if (currentQuestion.correctAnswer === answerIndex) {
            this.score += 1;
            return true;
        }
        return false;
    }
    
    nextQuestion() {
        this.currentQuestionIndex += 1;
    }
    
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
    
    reset() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
    }
    
    getProgress() {
        return {
            current: this.currentQuestionIndex + 1,
            total: this.questions.length,
            percent: ((this.currentQuestionIndex + 1) / this.questions.length) * 100
        };
    }
}

// DOM elements
const questionTextElement = document.querySelector('.question-text');
const optionsContainerElement = document.querySelector('.options-container');
const feedbackTextElement = document.querySelector('.feedback-text');
const feedbackContainerElement = document.querySelector('.feedback-container');
const nextButtonElement = document.querySelector('.next-btn');
const restartButtonElement = document.querySelector('.restart-btn');
const scoreElement = document.querySelector('.score-value');
const progressBarElement = document.querySelector('.quiz-progress .progress-bar');
const progressTextElement = document.querySelector('.quiz-progress .progress-text');

// Initialize quiz
let quiz;

// Load quiz questions
fetchQuestions().then(questions => {
    quiz = new Quiz(questions);
    loadQuestion();
});

// Functions
async function fetchQuestions() {
    try {
        // Instead of fetching, we're using the imported questions from questions.js
        return questions;
    } catch (error) {
        console.error("Error loading questions:", error);
        return [];
    }
}

function loadQuestion() {
    if (quiz.hasEnded()) {
        showResults();
        return;
    }
    
    const currentQuestion = quiz.getCurrentQuestion();
    const progress = quiz.getProgress();
    
    // Update question text
    questionTextElement.textContent = currentQuestion.question;
    
    // Update options
    optionsContainerElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.classList.add('option-btn');
        optionButton.textContent = option;
        optionButton.addEventListener('click', () => selectOption(index));
        optionsContainerElement.appendChild(optionButton);
    });
    
    // Update progress
    progressTextElement.textContent = `Question ${progress.current} of ${progress.total}`;
    progressBarElement.style.setProperty('--progress', `${progress.percent}%`);
    
    // Update score
    scoreElement.textContent = quiz.score;
    
    // Reset UI elements
    feedbackContainerElement.classList.remove('show', 'correct', 'incorrect');
    feedbackTextElement.textContent = '';
    nextButtonElement.disabled = true;
}

function selectOption(selectedIndex) {
    // Disable all options to prevent multiple selection
    document.querySelectorAll('.option-btn').forEach(button => {
        button.disabled = true;
    });
    
    const currentQuestion = quiz.getCurrentQuestion();
    const isCorrect = quiz.answerQuestion(selectedIndex);
    const selectedButton = document.querySelectorAll('.option-btn')[selectedIndex];
    
    // Update UI based on answer
    if (isCorrect) {
        selectedButton.classList.add('correct');
        feedbackContainerElement.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
        feedbackContainerElement.classList.add('incorrect');
        
        // Highlight correct answer
        document.querySelectorAll('.option-btn')[currentQuestion.correctAnswer].classList.add('correct');
    }
    
    selectedButton.classList.add('selected');
    
    // Show feedback
    feedbackTextElement.textContent = currentQuestion.feedback || 
        (isCorrect ? 'Correct! Well done.' : `Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`);
    feedbackContainerElement.classList.add('show');
    
    // Enable next button
    nextButtonElement.disabled = false;
}

function showResults() {
    const percentageScore = Math.round((quiz.score / quiz.questions.length) * 100);
    
    questionTextElement.textContent = `Quiz Completed! Your Score: ${quiz.score}/${quiz.questions.length} (${percentageScore}%)`;
    optionsContainerElement.innerHTML = '';
    
    feedbackContainerElement.classList.remove('correct', 'incorrect');
    feedbackTextElement.textContent = 'Thank you for taking the quiz!';
    feedbackContainerElement.classList.add('show');
    
    nextButtonElement.style.display = 'none';
}

// Event listeners
nextButtonElement.addEventListener('click', () => {
    quiz.nextQuestion();
    loadQuestion();
});

restartButtonElement.addEventListener('click', () => {
    quiz.reset();
    nextButtonElement.style.display = 'block';
    loadQuestion();
});

