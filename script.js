   // Quiz Data - 10 categories, 50 questions each (total 500 questions)
   const quizData = {
       mathematics: {
           name: "Mathematics",
           description: "Algebra, Calculus, Geometry, and more",
           icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
           questions: [
               {
                   question: "What is the derivative of f(x) = 3x² + 2x - 5 with respect to x?",
                   options: ["6x + 2", "6x - 2", "3x + 2", "6x² + 2"],
                   answer: 0,
                   difficulty: "medium",
                   explanation: "The derivative of 3x² is 6x, derivative of 2x is 2, and derivative of a constant is 0, so the result is 6x + 2."
               },
               // ... 49 more questions
           ]
       },
       // ... Other categories
   };

   // Quiz State Management
   let currentQuiz = {
       questions: [],
       currentQuestionIndex: 0,
       score: 0,
       answers: [],
       timeLimit: 0,
       timerInterval: null
   };

   // DOM Elements
   const configScreen = document.getElementById('config-screen');
   const instructionsScreen = document.getElementById('instructions-screen');
   const quizScreen = document.getElementById('quiz-screen');
   const resultsScreen = document.getElementById('results-screen');
   
   // Configuration Elements
   const categorySelect = document.getElementById('category');
   const difficultySelect = document.getElementById('difficulty');
   const questionCountSelect = document.getElementById('question-count');
   const timeLimitSelect = document.getElementById('time-limit');
   
   // Quiz Screen Elements
   const questionContainer = document.getElementById('question-container');
   const questionCounter = document.getElementById('question-counter');
   const quizScore = document.getElementById('quiz-score');
   const quizProgress = document.getElementById('quiz-progress');
   const quizCategory = document.getElementById('quiz-category');
   const quizDifficulty = document.getElementById('quiz-difficulty');
   const timerContainer = document.getElementById('timer-container');
   const questionTimer = document.getElementById('question-timer');
   const timeLeft = document.getElementById('time-left');
   const prevQuestionBtn = document.getElementById('prev-question');
   const nextQuestionBtn = document.getElementById('next-question');
   const submitQuizBtn = document.getElementById('submit-quiz');
   
   // Results Screen Elements
   const finalScore = document.getElementById('final-score');
   const correctAnswers = document.getElementById('correct-answers');
   const wrongAnswers = document.getElementById('wrong-answers');
   const categoryPerformance = document.getElementById('category-performance');
   
   // Button Elements
   const startQuizBtn = document.getElementById('start-quiz');
   const backToConfigBtn = document.getElementById('back-to-config');
   const proceedToQuizBtn = document.getElementById('proceed-to-quiz');
   const restartQuizBtn = document.getElementById('restart-quiz');
   const newQuizBtn = document.getElement
