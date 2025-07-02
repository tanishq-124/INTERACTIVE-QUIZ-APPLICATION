document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const quizSelectionModal = document.getElementById('quizSelectionModal');
    const instructionsModal = document.getElementById('instructionsModal');
    const quizInterface = document.getElementById('quizInterface');
    const resultsScreen = document.getElementById('resultsScreen');
    const reviewMode = document.getElementById('reviewMode');
    
    // Quiz settings elements
    const timeLimitSelect = document.getElementById('timeLimit');
    const questionCountSelect = document.getElementById('questionCount');
    const difficultyLevelSelect = document.getElementById('difficultyLevel');
    const quizCategorySelect = document.getElementById('quizCategory');
    
    // Instruction elements
    const instQuestionCount = document.getElementById('instQuestionCount');
    const instTimeLimit = document.getElementById('instTimeLimit');
    
    // Quiz control buttons
    const startQuizBtn = document.getElementById('startQuizBtn');
    const backToSettingsBtn = document.getElementById('backToSettingsBtn');
    const confirmStartQuizBtn = document.getElementById('confirmStartQuizBtn');
    const quitQuizBtn = document.getElementById('quitQuizBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const tryAgainBtn = document.getElementById('tryAgainBtn');
    const reviewAnswersBtn = document.getElementById('reviewAnswersBtn');
    const backToResultsBtn = document.getElementById('backToResultsBtn');
    
    // Quiz display elements
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const feedbackContainer = document.getElementById('feedbackContainer');
    const feedbackContent = document.getElementById('feedbackContent');
    const quizCategoryBadge = document.getElementById('quizCategoryBadge');
    const timer = document.getElementById('timer');
    const questionCounter = document.getElementById('questionCounter');
    const quizProgress = document.getElementById('quizProgress');
    
    // Results display elements
    const finalScore = document.getElementById('finalScore');
    const correctAnswers = document.getElementById('correctAnswers');
    const percentage = document.getElementById('percentage');
    const performanceChart = document.getElementById('performanceChart');
    const reviewQuestionsContainer = document.getElementById('reviewQuestionsContainer');
    
    // Quiz state variables
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let correctCount = 0;
    let timerInterval;
    let timeRemaining;
    let selectedOption = null;
    let userAnswers = [];
    let quizStartedAt = null;
    
    // Initialize the app
    init();
    
    function init() {
        // Show quiz selection modal by default
        quizSelectionModal.classList.remove('hidden');
        
        // Set up event listeners
        setupEventListeners();
    }
    
    function setupEventListeners() {
        startQuizBtn.addEventListener('click', showInstructions);
        backToSettingsBtn.addEventListener('click', backToSettings);
        confirmStartQuizBtn.addEventListener('click', startQuiz);
        quitQuizBtn.addEventListener('click', quitQuiz);
        nextQuestionBtn.addEventListener('click', showNextQuestion);
        tryAgainBtn.addEventListener('click', resetQuiz);
        reviewAnswersBtn.addEventListener('click', showReview);
        backToResultsBtn.addEventListener('click', backToResults);
    }
    
    function showInstructions() {
        // Update instructions with selected values
        instQuestionCount.textContent = questionCountSelect.options[questionCountSelect.selectedIndex].text;
        instTimeLimit.textContent = timeLimitSelect.value === '0' ? 'No time limit' : `${timeLimitSelect.value} minutes`;
        
        // Hide selection modal and show instructions
        quizSelectionModal.classList.add('hidden');
        instructionsModal.classList.remove('hidden');
    }
    
    function backToSettings() {
        instructionsModal.classList.add('hidden');
        quizSelectionModal.classList.remove('hidden');
    }
    
    function startQuiz() {
        // Get quiz settings
        const timeLimit = parseInt(timeLimitSelect.value);
        const questionCount = parseInt(questionCountSelect.value);
        const difficulty = difficultyLevelSelect.value;
        const category = quizCategorySelect.value;
        
        // Get questions based on settings
        currentQuestions = getQuestions(category, questionCount, difficulty);
        
        // Initialize quiz state
        currentQuestionIndex = 0;
        score = 0;
        correctCount = 0;
        userAnswers = [];
        quizStartedAt = new Date();
        
        // Set up timer if time limit is set
        if (timeLimit > 0) {
            timeRemaining = timeLimit * 60; // Convert minutes to seconds
            updateTimerDisplay();
            timerInterval = setInterval(() => {
                timeRemaining--;
                updateTimerDisplay();
                
                if (timeRemaining <= 0) {
                    clearInterval(timerInterval);
                    endQuiz();
                }
            }, 1000);
        } else {
            timer.textContent = '∞';
        }
        
        // Update UI elements
        quizCategoryBadge.textContent = getCategoryName(category);
        questionCounter.textContent = `1/${currentQuestions.length}`;
        quizProgress.style.width = '0%';
        
        // Hide instructions and show quiz interface
        instructionsModal.classList.add('hidden');
        quizInterface.classList.remove('hidden');
        
        // Display first question
        displayQuestion(currentQuestions[currentQuestionIndex]);
    }
    
    function updateTimerDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timer.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    
    function displayQuestion(question) {
        // Reset selected option
        selectedOption = null;
        
        // Update question text
        questionText.textContent = question.question;
        
        // Clear options container
        optionsContainer.innerHTML = '';
        
        // Create option buttons
        question.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn bg-gray-700 p-4 rounded-lg text-left hover:bg-gray-600 transition-colors';
            optionBtn.textContent = option;
            optionBtn.dataset.index = index;
            optionBtn.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionBtn);
        });
        
        // Hide feedback and show options
        feedbackContainer.classList.add('hidden');
    }
    
    function selectOption(index) {
        // Don't allow selection after answer is revealed
        if (feedbackContainer.classList.contains('hidden')) {
            // Highlight selected option
            const options = optionsContainer.querySelectorAll('.option-btn');
            options.forEach(btn => btn.classList.remove('bg-blue-600'));
            options[index].classList.add('bg-blue-600');
            
            selectedOption = index;
            
            // Store the user's answer with timestamp
            const answerTime = new Date() - quizStartedAt;
            userAnswers.push({
                questionIndex: currentQuestionIndex,
                selectedOption: index,
                answerTime: answerTime,
                isCorrect: index === currentQuestions[currentQuestionIndex].answer,
                timestamp: new Date()
            });
            
            // Show feedback
            showFeedback(index);
        }
    }
    
    function showFeedback(selectedIndex) {
        const question = currentQuestions[currentQuestionIndex];
        const isCorrect = selectedIndex === question.answer;
        
        // Update score based on difficulty and response time (simplified)
        let pointsEarned = 0;
        const maxTime = 30000; // 30 seconds max for full points
        
        if (isCorrect) {
            correctCount++;
            
            // Calculate points based on difficulty
            const difficultyMultiplier = {
                'easy': 1,
                'medium': 2,
                'hard': 3
            }[question.difficulty] || 1;
            
            // Calculate time bonus (faster answers get more points)
            const answerTime = userAnswers[userAnswers.length - 1].answerTime;
            const timeFactor = Math.max(0, (maxTime - answerTime) / maxTime);
            
            pointsEarned = Math.ceil(100 * difficultyMultiplier * (0.5 + 0.5 * timeFactor));
            score += pointsEarned;
        }
        
        // Display feedback
        feedbackContent.className = isCorrect ? 'correct-feedback' : 'incorrect-feedback';
        
        if (isCorrect) {
            feedbackContent.innerHTML = `
                <h3 class="font-semibold text-green-500">Correct!</h3>
                <p class="text-gray-300">+${pointsEarned} points</p>
                <p>${getRandomEncouragement()}</p>
            `;
        } else {
            feedbackContent.innerHTML = `
                <h3 class="font-semibold text-red-500">Incorrect</h3>
                <p>The correct answer is: ${question.options[question.answer]}</p>
                <p>${getRandomExplanation()}</p>
            `;
        }
        
        // Show feedback container
        feedbackContainer.classList.remove('hidden');
    }
    
    function getRandomEncouragement() {
        const encouragements = [
            "Great job! You're really smart!",
            "Excellent! You nailed it!",
            "Perfect! You're on fire!",
            "Brilliant! Keep it up!",
            "Awesome! You're crushing it!"
        ];
        return encouragements[Math.floor(Math.random() * encouragements.length)];
    }
    
    function getRandomExplanation() {
        const explanations = [
            "Remember this concept for next time!",
            "You'll get it right next time!",
            "This is a tricky one - good to know now!",
            "Learning from mistakes is how we improve!",
            "This concept builds on fundamentals worth reviewing!"
        ];
        return explanations[Math.floor(Math.random() * explanations.length)];
    }
    
    function showNextQuestion() {
        // Move to next question
        currentQuestionIndex++;
        
        // Update progress bar
        quizProgress.style.width = `${(currentQuestionIndex / currentQuestions.length) * 100}%`;
        
        // Update question counter
        questionCounter.textContent = `${currentQuestionIndex + 1}/${currentQuestions.length}`;
        
        if (currentQuestionIndex < currentQuestions.length) {
            // Display next question
            displayQuestion(currentQuestions[currentQuestionIndex]);
        } else {
            // Quiz completed
            endQuiz();
        }
    }
    
    function endQuiz() {
        // Clear timer if running
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        // Calculate percentage correct
        const percentageCorrect = Math.round((correctCount / currentQuestions.length) * 100);
        
        // Update results screen
        finalScore.textContent = score;
        correctAnswers.textContent = `${correctCount}/${currentQuestions.length}`;
        percentage.textContent = `${percentageCorrect}%`;
        
        // Simple chart implementation
        performanceChart.innerHTML = `
            <div class="bg-gray-700 rounded-lg p-4">
                <h3 class="font-semibold mb-2">Performance Breakdown</h3>
                <div class="h-4 bg-gray-600 rounded-full mb-1">
                    <div class="h-4 bg-green-500 rounded-full" style="width: ${percentageCorrect}%"></div>
                </div>
                <div class="flex justify-between text-sm text-gray-300">
                    <span>Score: ${score}</span>
                    <span>Accuracy: ${percentageCorrect}%</span>
                </div>
            </div>
        `;
        
        // Hide quiz interface and show results
        quizInterface.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
    }
    
    function showReview() {
        resultsScreen.classList.add('hidden');
        reviewMode.classList.remove('hidden');
        
        // Create review content
        reviewQuestionsContainer.innerHTML = '';
        
        currentQuestions.forEach((question, index) => {
            const userAnswer = userAnswers.find(a => a.questionIndex === index);
            const isCorrect = userAnswer ? userAnswer.isCorrect : false;
            
            const questionEl = document.createElement('div');
            questionEl.className = `bg-gray-700 rounded-lg p-4 mb-4 ${isCorrect ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`;
            questionEl.innerHTML = `
                <h3 class="font-semibold mb-2">Question ${index + 1}: ${question.question}</h3>
                <div class="mb-2">
                    ${question.options.map((opt, optIndex) => `
                        <div class="mb-1 pl-4 ${optIndex === question.answer ? 'text-green-400 font-semibold' : 
                            (userAnswer && optIndex === userAnswer.selectedOption) ? 'text-red-400' : 'text-gray-400'}">
                            ${optIndex === question.answer ? '✓ ' : (userAnswer && optIndex === userAnswer.selectedOption) ? '✗ ' : '• '}
                            ${opt}
                        </div>
                    `).join('')}
                </div>
                ${!isCorrect && userAnswer ? `<p class="text-yellow-400 text-sm">Time: ${Math.round(userAnswer.answerTime/1000)}s | You selected: ${question.options[userAnswer.selectedOption]}</p>` : ''}
            `;
            
            reviewQuestionsContainer.appendChild(questionEl);
        });
    }
    
    function backToResults() {
        reviewMode.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
    }
    
    function quitQuiz() {
        if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
            resetQuiz();
        }
    }
    
    function resetQuiz() {
        // Clear any running timer
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        // Hide all screens except selection modal
        quizSelectionModal.classList.remove('hidden');
        instructionsModal.classList.add('hidden');
        quizInterface.classList.add('hidden');
        resultsScreen.classList.add('hidden');
        reviewMode.classList.add('hidden');
    }
});
