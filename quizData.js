document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const quizSetup = document.getElementById('quiz-setup');
    const quizInstructions = document.getElementById('quiz-instructions');
    const quizContainer = document.getElementById('quiz-container');
    const resultsContainer = document.getElementById('results-container');
    
    const timeLimitSelect = document.getElementById('time-limit');
    const questionCountSelect = document.getElementById('question-count');
    const difficultySelect = document.getElementById('difficulty');
    const categorySelect = document.getElementById('category');
    
    const startQuizBtn = document.getElementById('start-quiz');
    const backToSetupBtn = document.getElementById('back-to-setup');
    const startQuizConfirmBtn = document.getElementById('start-quiz-confirm');
    const nextQuestionBtn = document.getElementById('next-question');
    const retakeQuizBtn = document.getElementById('retake-quiz');
    
    const timeLimitDisplay = document.getElementById('time-limit-display');
    const questionCountDisplay = document.getElementById('question-count-display');
    
    const timerDisplay = document.getElementById('timer');
    const currentQuestionNumber = document.getElementById('current-question-number');
    const totalQuestions = document.getElementById('total-questions');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progressBar = document.querySelector('#progress-bar div');
    
    const scorePercentage = document.getElementById('score-percentage');
    const correctAnswers = document.getElementById('correct-answers');
    const incorrectAnswers = document.getElementById('incorrect-answers');
    const timeTaken = document.getElementById('time-taken');
    const categoryStats = document.getElementById('category-stats');
    
    // Quiz State
    let quizConfig = {
        timeLimit: 10,
        questionCount: 10,
        difficulty: 'all',
        category: 'all'
    };
    
    let quizQuestions = [];
    let currentQuestionIndex = 0;
    let selectedOptionIndex = null;
    let score = 0;
    let timer = null;
    let quizStartTime = null;
    let categoryPerformance = {};
    
    // Event Listeners
    startQuizBtn.addEventListener('click', showQuizInstructions);
    backToSetupBtn.addEventListener('click', () => {
        quizInstructions.classList.add('hidden');
        quizSetup.classList.remove('hidden');
    });
    startQuizConfirmBtn.addEventListener('click', startQuiz);
    nextQuestionBtn.addEventListener('click', showNextQuestion);
    retakeQuizBtn.addEventListener('click', resetQuiz);
    
    // Show Quiz Instructions
    function showQuizInstructions() {
        // Update config from form
        quizConfig.timeLimit = parseInt(timeLimitSelect.value);
        quizConfig.questionCount = parseInt(questionCountSelect.value);
        quizConfig.difficulty = difficultySelect.value;
        quizConfig.category = categorySelect.value;
        
        // Update instruction displays
        timeLimitDisplay.textContent = quizConfig.timeLimit === 0 ? 'unlimited time' : quizConfig.timeLimit + ' minutes';
        questionCountDisplay.textContent = quizConfig.questionCount === 0 ? 'all available' : quizConfig.questionCount;
        
        // Transition to instructions
        quizSetup.classList.add('hidden');
        quizInstructions.classList.remove('hidden');
        quizInstructions.classList.add('fade-in');
    }
    
    // Start Quiz
    function startQuiz() {
        // Get questions based on config
        quizQuestions = getQuizQuestions({
            category: quizConfig.category,
            difficulty: quizConfig.difficulty,
            count: quizConfig.questionCount
        });
        
        // Initialize category performance tracking
        const categoriesUsed = quizConfig.category === 'all' 
            ? Object.keys(questionBank) 
            : [quizConfig.category];
        
        categoriesUsed.forEach(cat => {
            categoryPerformance[cat] = {
                correct: 0,
                total: quizQuestions.filter(q => 
                    quizConfig.category === 'all' ? q.category === cat : true
                ).length
            };
        });
        
        // Update UI
        totalQuestions.textContent = quizQuestions.length;
        currentQuestionNumber.textContent = 1;
        progressBar.style.width = '0%';
        
        // Start timer if time limit is set
        if (quizConfig.timeLimit > 0) {
            const minutes = quizConfig.timeLimit - 1;
            let seconds = 59;
            
            timerDisplay.textContent = `${quizConfig.timeLimit}:00`;
            
            timer = setInterval(() => {
                if (minutes === 0 && seconds === 0) {
                    clearInterval(timer);
                    endQuiz();
                } else {
                    if (seconds === 0) {
                        seconds = 59;
                        timerDisplay.textContent = `${minutes}:59`;
                    } else {
                        seconds--;
                        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
                        timerDisplay.textContent = `${minutes}:${formattedSeconds}`;
                    }
                }
                
                // Flash red when under 1 minute
                if (minutes === 0 && seconds < 30) {
                    timerDisplay.classList.add('timer-pulse');
                    timerDisplay.classList.add('bg-red-600');
                    timerDisplay.classList.remove('bg-indigo-100');
                    timerDisplay.classList.remove('text-indigo-800');
                    timerDisplay.classList.add('text-white');
                }
            }, 1000);
        }
        
        quizStartTime = new Date();
        
        // Transition to quiz
        quizInstructions.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        quizContainer.classList.add('slide-up');
        
        // Show first question
        showQuestion(0);
    }
    
    // Show Question
    function showQuestion(index) {
        if (index >= quizQuestions.length) {
            endQuiz();
            return;
        }
        
        currentQuestionIndex = index;
        const question = quizQuestions[index];
        selectedOptionIndex = null;
        
        // Update UI
        questionText.textContent = question.question;
        currentQuestionNumber.textContent = index + 1;
        progressBar.style.width = `${((index + 1) / quizQuestions.length) * 100}%`;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Add new options
        question.options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option flex items-start p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition duration-200';
            optionElement.innerHTML = `
                <div class="flex-shrink-0 mt-0.5 h-6 w-6 border-2 border-gray-300 rounded-full mr-3"></div>
                <div class="flex-grow">${option}</div>
            `;
            optionElement.dataset.index = i;
            optionElement.addEventListener('click', () => selectOption(i));
            optionsContainer.appendChild(optionElement);
        });
        
        // Enable/disable next button based on selection
        nextQuestionBtn.disabled = selectedOptionIndex === null;
    }
    
    // Select Option
    function selectOption(index) {
        // Deselect all options
        document.querySelectorAll('.quiz-option').forEach(opt => {
            opt.classList.remove('selected');
            opt.querySelector('div:first-child').className = 'flex-shrink-0 mt-0.5 h-6 w-6 border-2 border-gray-300 rounded-full mr-3';
        });
        
        // Select clicked option
        const selectedOption = document.querySelector(`.quiz-option[data-index="${index}"]`);
        selectedOption.classList.add('selected');
        selectedOption.querySelector('div:first-child').className = 'flex-shrink-0 mt-0.5 h-6 w-6 border-2 border-indigo-500 rounded-full mr-3 flex items-center justify-center';
        selectedOption.querySelector('div:first-child').innerHTML = `
            <div class="w-3 h-3 rounded-full bg-indigo-500"></div>
        `;
        
        selectedOptionIndex = index;
        nextQuestionBtn.disabled = false;
    }
    
    // Show Next Question
    function showNextQuestion() {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        
        // Check if answer is correct
        const isCorrect = selectedOptionIndex === currentQuestion.correctAnswer;
        
        // Update score and category performance
        if (isCorrect) {
            score++;
            
            // For mixed quizzes, find the category of current question
            if (quizConfig.category === 'all') {
                for (const cat in questionBank) {
                    if (questionBank[cat].includes(currentQuestion)) {
                        categoryPerformance[cat].correct++;
                        break;
                    }
                }
            } else {
                categoryPerformance[quizConfig.category].correct++;
            }
        }
        
        // Show feedback
        showAnswerFeedback(currentQuestion.correctAnswer, isCorrect);
        
        // Proceed after delay
        setTimeout(() => {
            if (currentQuestionIndex + 1 < quizQuestions.length) {
                showQuestion(currentQuestionIndex + 1);
                nextQuestionBtn.disabled = true;
            } else {
                endQuiz();
            }
        }, 1000);
    }
    
    // Show Answer Feedback
    function showAnswerFeedback(correctIndex, isCorrect) {
        const options = document.querySelectorAll('.quiz-option');
        
        // Mark correct answer
        options[correctIndex].classList.add('correct');
        options[correctIndex].querySelector('div:first-child').innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-green-500">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
        `;
        
        // Mark user's answer if incorrect
        if (!isCorrect && selectedOptionIndex !== null) {
            options[selectedOptionIndex].classList.add('incorrect');
            options[selectedOptionIndex].querySelector('div:first-child').innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-red-500">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
            `;
        }
    }
    
    // End Quiz
    function endQuiz() {
        // Stop timer
        if (timer) {
            clearInterval(timer);
        }
        
        // Calculate time taken
        const quizEndTime = new Date();
        const timeDiff = (quizEndTime - quizStartTime) / 1000; // in seconds
        const minutes = Math.floor(timeDiff / 60);
        const seconds = Math.floor(timeDiff % 60);
        
        // Update results
        const percentage = Math.round((score / quizQuestions.length) * 100);
        scorePercentage.textContent = `${percentage}%`;
        correctAnswers.textContent = score;
        incorrectAnswers.textContent = quizQuestions.length - score;
        timeTaken.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        // Update category performance
        categoryStats.innerHTML = '';
        for (const cat in categoryPerformance) {
            if (categoryPerformance[cat].total > 0) {
                const percentage = Math.round((categoryPerformance[cat].correct / categoryPerformance[cat].total) * 100);
                const categoryElement = document.createElement('div');
                categoryElement.className = 'mb-3';
                categoryElement.innerHTML = `
                    <div class="flex justify-between mb-1">
                        <span class="text-gray-700 capitalize">${cat}</span>
                        <span class="font-medium">${percentage}%</span>
                    </div>
                    <div class="category-bar-container">
                        <div class="category-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                `;
                categoryStats.appendChild(categoryElement);
            }
        }
        
        // Transition to results
        quizContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        resultsContainer.classList.add('slide-up');
    }
    
    // Reset Quiz
    function resetQuiz() {
        // Reset state
        currentQuestionIndex = 0;
        selectedOptionIndex = null;
        score = 0;
        quizQuestions = [];
        categoryPerformance = {};
        
        // Reset timer display
        if (timer) {
            clearInterval(timer);
        }
        
        timerDisplay.textContent = '10:00';
        timerDisplay.classList.remove('timer-pulse', 'bg-red-600', 'text-white');
        timerDisplay.classList.add('bg-indigo-100', 'text-indigo-800');
        
        // Transition back to setup
        resultsContainer.classList.add('hidden');
        quizSetup.classList.remove('hidden');
    }
});

