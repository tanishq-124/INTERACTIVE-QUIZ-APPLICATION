const questionBank = {
    science: [
        {
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Ag", "Au", "Gd"],
            correctAnswer: 2,
            difficulty: "easy"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: 1,
            difficulty: "easy"
        },
        {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic reticulum"],
            correctAnswer: 2,
            difficulty: "easy"
        },
        {
            question: "Which gas is most abundant in Earth's atmosphere?",
            options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"],
            correctAnswer: 2,
            difficulty: "medium"
        },
        {
            question: "What is the speed of light in a vacuum?",
            options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
            correctAnswer: 0,
            difficulty: "medium"
        },
        {
            question: "Which scientist developed the theory of relativity?",
            options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
            correctAnswer: 1,
            difficulty: "medium"
        },
        {
            question: "What is the process by which plants make their own food called?",
            options: ["Respiration", "Transpiration", "Photosynthesis", "Oxidation"],
            correctAnswer: 2,
            difficulty: "hard"
        },
        {
            question: "Which element has the atomic number 1?",
            options: ["Helium", "Hydrogen", "Nitrogen", "Oxygen"],
            correctAnswer: 1,
            difficulty: "hard"
        },
        {
            question: "What is the SI unit of electrical resistance?",
            options: ["Volt", "Ampere", "Ohm", "Watt"],
            correctAnswer: 2,
            difficulty: "hard"
        },
        {
            question: "Which vitamin is produced when human skin is exposed to sunlight?",
            options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
            correctAnswer: 2,
            difficulty: "hard"
        }
    ],
    mathematics: [
        {
            question: "What is the value of π (pi) to two decimal places?",
            options: ["3.14", "3.16", "3.18", "3.12"],
            correctAnswer: 0,
            difficulty: "easy"
        },
        {
            question: "What is the square root of 64?",
            options: ["6", "7", "8", "9"],
            correctAnswer: 2,
            difficulty: "easy"
        },
        {
            question: "What is the next number in the sequence: 2, 4, 6, 8, ...?",
            options: ["9", "10", "11", "12"],
            correctAnswer: 1,
            difficulty: "easy"
        },
        {
            question: "What is the derivative of x²?",
            options: ["x", "2x", "x³", "2x²"],
            correctAnswer: 1,
            difficulty: "medium"
        },
        {
            question: "What is the value of 5 factorial (5!)?",
            options: ["60", "100", "120", "150"],
            correctAnswer: 2,
            difficulty: "medium"
        },
        {
            question: "What is the sum of the interior angles of a triangle?",
            options: ["90°", "180°", "270°", "360°"],
            correctAnswer: 1,
            difficulty: "medium"
        },
        {
            question: "What is the solution to the equation 3x² - 2x - 5 = 0?",
            options: ["x = 1, -1.67", "x = 2, -0.67", "x = 1, -2", "x = 1.67, -1"],
            correctAnswer: 3,
            difficulty: "hard"
        },
        {
            question: "What is the formula for the volume of a sphere?",
            options: ["⅓πr³", "πr²h", "4/3πr³", "2πr²"],
            correctAnswer: 2,
            difficulty: "hard"
        },
        {
            question: "What is the integral of 1/x?",
            options: ["ln|x|", "1/x²", "x²/2", "eˣ"],
            correctAnswer: 0,
            difficulty: "hard"
        },
        {
            question: "What is the value of sin(90°)?",
            options: ["0", "0.5", "1", "Undefined"],
            correctAnswer: 2,
            difficulty: "hard"
        }
    ],
    history: [
        {
            question: "In which year did World War II end?",
            options: ["1943", "1945", "1947", "1950"],
            correctAnswer: 1,
            difficulty: "easy"
        },
        {
            question: "Who was the first president of the United States?",
            options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
            correctAnswer: 2,
            difficulty: "easy"
        },
        {
            question: "Which ancient civilization built the pyramids?",
            options: ["Romans", "Greeks", "Egyptians", "Aztecs"],
            correctAnswer: 2,
            difficulty: "easy"
        },
        {
            question: "Who invented the telephone?",
            options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
            correctAnswer: 1,
            difficulty: "medium"
        },
        {
            question: "Which country was the first to industrialize?",
            options: ["France", "United States", "Germany", "Great Britain"],
            correctAnswer: 3,
            difficulty: "medium"
        },
        {
            question: "What was the capital of the Byzantine Empire?",
            options: ["Rome", "Athens", "Constantinople", "Alexandria"],
            correctAnswer: 2,
            difficulty: "medium"
        },
        {
            question: "In which year did the Berlin Wall fall?",
            options: ["1987", "1989", "1991", "1993"],
            correctAnswer: 1,
            difficulty: "hard"
        },
        {
            question: "Who was the leader of the Soviet Union during the Cuban Missile Crisis?",
            options: ["Joseph Stalin", "Leonid Brezhnev", "Mikhail Gorbachev", "Nikita Khrushchev"],
            correctAnswer: 3,
            difficulty: "hard"
        },
        {
            question: "Which treaty ended World War I?",
            options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Vienna", "Treaty of Tordesillas"],
            correctAnswer: 1,
            difficulty: "hard"
        },
        {
            question: "Who was the first female prime minister of a country?",
            options: ["Margaret Thatcher", "Indira Gandhi", "Sirimavo Bandaranaike", "Golda Meir"],
            correctAnswer: 2,
            difficulty: "hard"
        }
    ],
    programming: [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High-Level Text Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
            correctAnswer: 0,
            difficulty: "easy"
        },
        {
            question: "Which language runs in a web browser?",
            options: ["Java", "C", "Python", "JavaScript"],
            correctAnswer: 3,
            difficulty: "easy"
        },
        {
            question: "What does CSS stand for?",
            options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
            correctAnswer: 2,
            difficulty: "easy"
        },
        {
            question: "Which of these is NOT a JavaScript framework?",
            options: ["React", "Angular", "Laravel", "Vue"],
            correctAnswer: 2,
            difficulty: "medium"
        },
        {
            question: "What is the correct way to write a for loop in JavaScript?",
            options: ["for (i = 0; i++; i < 5)", "for (i = 0; i < 5; i++)", "for (i < 5; i = 0; i++)", "for (i++; i = 0; i < 5)"],
            correctAnswer: 1,
            difficulty: "medium"
        },
        {
            question: "Which symbol is used for single-line comments in JavaScript?",
            options: ["//", "/*", "<!--", "#"],
            correctAnswer: 0,
            difficulty: "medium"
        },
        {
            question: "What will '5' + 3 evaluate to in JavaScript?",
            options: ["8", "53", "Error", "undefined"],
            correctAnswer: 1,
            difficulty: "hard"
        },
        {
            question: "What is the output of Math.floor(7.9) in JavaScript?",
            options: ["7", "7.9", "8", "8.0"],
            correctAnswer: 0,
            difficulty: "hard"
        },
        {
            question: "What does the 'this' keyword refer to in JavaScript?",
            options: ["The function itself", "The owning object", "The document object", "The window object"],
            correctAnswer: 1,
            difficulty: "hard"
        },
        {
            question: "Which method converts a JSON string to a JavaScript object?",
            options: ["JSON.parse()", "JSON.stringify()", "JSON.decode()", "JSON.encode()"],
            correctAnswer: 0,
            difficulty: "hard"
        }
    ],
    literature: [
        {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            correctAnswer: 1,
            difficulty: "easy"
        },
        {
            question: "What is the main theme of George Orwell's '1984'?",
            options: ["Romance", "Totalitarianism", "Adventure", "Historical fiction"],
            correctAnswer: 1,
            difficulty: "easy"
        },
        {
            question: "Which book features the character Sherlock Holmes?",
            options: ["Great Expectations", "Moby Dick", "Pride and Prejudice", "A Study in Scarlet"],
            correctAnswer: 3,
            difficulty: "easy"
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["J.D. Salinger", "Harper Lee", "Ernest Hemingway", "F. Scott Fitzgerald"],
            correctAnswer: 1,
            difficulty: "medium"
        },
        {
            question: "Which literary movement is associated with the rejection of traditional forms?",
            options: ["Romanticism", "Realism", "Modernism", "Classicism"],
            correctAnswer: 2,
            difficulty: "medium"
        },
        {
            question: "Which poet wrote 'The Waste Land'?",
            options: ["William Wordsworth", "T.S. Eliot", "Robert Frost", "Walt Whitman"],
            correctAnswer: 1,
            difficulty: "medium"
        },
        {
            question: "What is the setting of Homer's 'Odyssey'?",
            options: ["Rome", "Ancient Greece", "Egypt", "Persia"],
            correctAnswer: 1,
            difficulty: "hard"
        },
        {
            question: "Who is the author of 'One Hundred Years of Solitude'?",
            options: ["Jorge Luis Borges", "Pablo Neruda", "Gabriel García Márquez", "Isabel Allende"],
            correctAnswer: 2,
            difficulty: "hard"
        },
        {
            question: "Which Shakespeare play features the character Lady Macbeth?",
            options: ["Hamlet", "Othello", "Macbeth", "King Lear"],
            correctAnswer: 2,
            difficulty: "hard"
        },
        {
            question: "What is the first novel of Marcel Proust's seven-volume work 'In Search of Lost Time'?",
            options: ["Swann's Way", "Within a Budding Grove", "Time Regained", "The Guermantes Way"],
            correctAnswer: 0,
            difficulty: "hard"
        }
    ]
};

// Function to get shuffled questions based on criteria
function getQuizQuestions(config) {
    let questions = [];
    const { category, difficulty, count } = config;
    
    // Get all questions or filter by category
    if (category === 'all') {
        for (const cat in questionBank) {
            questions = questions.concat(questionBank[cat]);
        }
    } else {
        questions = questionBank[category] || [];
    }
    
    // Filter by difficulty if needed
    if (difficulty !== 'all') {
        questions = questions.filter(q => q.difficulty === difficulty);
    }
    
    // Shuffle the questions
    questions = shuffleArray(questions);
    
    // Limit to requested count or to the number of available questions
    const questionCount = count === 0 ? questions.length : Math.min(count, questions.length);
    
    return questions.slice(0, questionCount);
}

// Helper function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

