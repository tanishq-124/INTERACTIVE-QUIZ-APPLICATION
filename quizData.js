const quizDatabase = {
    biology: [
        {
            question: "Which organelle is known as the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"],
            answer: 1,
            difficulty: "easy"
        },
        // Add more biology questions...
    ],
    physics: [
        {
            question: "What is the SI unit of force?",
            options: ["Joule", "Newton", "Watt", "Pascal"],
            answer: 1,
            difficulty: "easy"
        },
        // Add more physics questions...
    ],
    chemistry: [
        {
            question: "What is the pH value of pure water?",
            options: ["5", "7", "9", "12"],
            answer: 1,
            difficulty: "easy"
        },
        // Add more chemistry questions...
    ],
    mathematics: [
        {
            question: "What is the value of π (pi) to two decimal places?",
            options: ["3.14", "3.16", "3.41", "3.15"],
            answer: 0,
            difficulty: "easy"
        },
        // Add more math questions...
    ],
    "computer-science": [
        {
            question: "Which data structure uses FIFO (First In First Out) principle?",
            options: ["Stack", "Queue", "Tree", "Graph"],
            answer: 1,
            difficulty: "easy"
        },
        // Add more CS questions...
    ],
    history: [
        {
            question: "In which year did World War I begin?",
            options: ["1912", "1914", "1916", "1918"],
            answer: 1,
            difficulty: "easy"
        },
        // Add more history questions...
    ],
    literature: [
        {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            answer: 1,
            difficulty: "easy"
        },
        // Add more literature questions...
    ],
    geography: [
        {
            question: "What is the longest river in the world?",
            options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
            answer: 0,
            difficulty: "easy"
        },
        // Add more geography questions...
    ],
    economics: [
        {
            question: "What does GDP stand for?",
            options: ["Gross Domestic Product", "General Domestic Production", "Gross Development Product", "General Development Production"],
            answer: 0,
            difficulty: "easy"
        },
        // Add more economics questions...
    ],
    "general-knowledge": [
        {
            question: "How many colors are there in a rainbow?",
            options: ["5", "6", "7", "8"],
            answer: 2,
            difficulty: "easy"
        },
        // Add more GK questions...
    ]
};

// Function to get questions based on selected parameters
function getQuestions(category, count, difficulty) {
    let questions = [];
    
    if (category === 'mixed') {
        // Get questions from all categories
        for (const cat in quizDatabase) {
            questions = questions.concat(quizDatabase[cat]);
        }
    } else {
        // Get questions from selected category
        questions = quizDatabase[category] || [];
    }
    
    // Filter by difficulty if not mixed
    if (difficulty !== 'mixed') {
        questions = questions.filter(q => q.difficulty === difficulty);
    }
    
    // Shuffle questions
    questions = shuffleArray(questions);
    
    // Return requested number of questions
    return questions.slice(0, count);
}

// Helper function to shuffle array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
