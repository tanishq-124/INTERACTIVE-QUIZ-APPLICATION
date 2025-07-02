document.addEventListener('DOMContentLoaded', function() {
    const startQuizBtn = document.getElementById('startQuizBtn');
    const confirmStartQuizBtn = document.getElementById('confirmStartQuizBtn');
    const quizSelectionModal = document.getElementById('quizSelectionModal');
    const instructionsModal = document.getElementById('instructionsModal');
    const quizInterface = document.getElementById('quizInterface');
    const resultsScreen = document.getElementById('resultsScreen');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const feedbackContainer = document.getElementById('feedbackContainer');
    const feedbackContent = document.getElementById('feedbackContent');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const finalScore = document.getElementById('finalScore');
    const correctAnswers = document.getElementById('correctAnswers');
    const percentage = document.getElementById('percentage');
    const tryAgainBtn = document.getElementById('tryAgainBtn');
    const timer = document.getElementById('timer');
    const questionCounter = document.getElementById('questionCounter');
    const quitQuizBtn = document.getElementById('quitQuizBtn');
    const quizCategoryBadge = document.getElementById('quizCategoryBadge');

    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let correctCount = 0;
    let timerInterval;
    let timeRemaining;

    startQuizBtn.addEventListener('click', showInstructions);
    confirmStartQuizBtn.addEventListener('click', startQuiz);
    nextQuestionBtn.addEventListener('click', showNextQuestion);
    tryAgainBtn.addEventListener('click', resetQuiz);
    quitQuizBtn.addEventListener('click', quitQuiz);

    function showInstructions() {
        quizSelectionModal.classList.add('hidden');
        instructionsModal.classList.remove('hidden');
    }

    function startQuiz() {
        const timeLimit = parseInt(document.getElementById('timeLimit').value);
        const questionCount = parseInt(document.getElementById('questionCount').value);
        const difficulty = document.getElementById('difficultyLevel').value;
        const category = document.getElementById('quizCategory').value;

        currentQuestions = getQuestions(category, questionCount, difficulty);
        currentQuestionIndex = 0;
        score = 0;
        correctCount = 0;

        if (timeLimit > 0) {
            timeRemaining = timeLimit * 60;
            timerInterval = setInterval(updateTimer, 1000);
        }

        quizCategoryBadge.textContent = category;
        questionCounter.textContent = `1/${currentQuestions.length}`;
        instructionsModal.classList.add('hidden');
        quizInterface.classList.remove('hidden');
        displayQuestion(currentQuestions[currentQuestionIndex]);
    }

    function updateTimer() {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endQuiz();
            return;
        }
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timer.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function displayQuestion(question) {
        questionText.textContent = question.question;
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'bg-gray-700 p-4 rounded-lg w-full mb-2';
            button.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(button);
        });
    }

    function selectOption(selectedIndex) {
        const question = currentQuestions[currentQuestionIndex];
        const isCorrect = selectedIndex === question.answer;
        if (isCorrect) {
            score += 10; // Increment score
            correctCount++;
            feedbackContent.textContent = "Correct!";
        } else {
            feedbackContent.textContent = `Incorrect! The correct answer was: ${question.options[question.answer]}`;
        }
        feedbackContainer.classList.remove('hidden');
        nextQuestionBtn.classList.remove('hidden');
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            questionCounter.textContent = `${currentQuestionIndex + 1}/${currentQuestions.length}`;
            displayQuestion(currentQuestions[currentQuestionIndex]);
            feedbackContainer.classList.add('hidden');
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        clearInterval(timerInterval);
        finalScore.textContent = score;
        correctAnswers.textContent = correctCount;
        percentage.textContent = `${Math.round((correctCount / currentQuestions.length) * 100)}%`;
        quizInterface.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
    }

    function resetQuiz() {
        resultsScreen.classList.add('hidden');
        quizSelectionModal.classList.remove('hidden');
    }

    function quitQuiz() {
        if (confirm("Are you sure you want to quit?")) {
            resetQuiz();
        }
    }
});
