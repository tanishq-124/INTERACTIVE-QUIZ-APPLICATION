// Quiz questions data
const questions = [
    {
        question: "What does 'DOM' stand for in JavaScript?",
        options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Output Mechanism",
            "Display Object Matrix"
        ],
        correctAnswer: 0,
        feedback: "The Document Object Model (DOM) is a programming interface for web documents."
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: [
            "Boolean",
            "Number",
            "String",
            "Float"
        ],
        correctAnswer: 3,
        feedback: "Float is not a separate data type in JavaScript. Numbers are all stored as floating-point values."
    },
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: [
            "var x = 5;",
            "let x = 5;",
            "const x = 5;",
            "All of the above"
        ],
        correctAnswer: 3,
        feedback: "All three are valid ways to declare variables in JavaScript, though they have different scoping rules."
    },
    {
        question: "What does the '===' operator do in JavaScript?",
        options: [
            "Assigns a value to a variable",
            "Compares values for equality without type coercion",
            "Checks if two objects are identical",
            "Performs strict addition"
        ],
        correctAnswer: 1,
        feedback: "The '===' operator is the strict equality operator that doesn't perform type coercion."
    },
    {
        question: "Which method adds new elements to the end of an array?",
        options: [
            "push()",
            "pop()",
            "shift()",
            "unshift()"
        ],
        correctAnswer: 0,
        feedback: "The push() method adds one or more elements to the end of an array."
    },
    {
        question: "What will 'typeof null' return in JavaScript?",
        options: [
            "'null'",
            "'undefined'",
            "'object'",
            "'string'"
        ],
        correctAnswer: 2,
        feedback: "This is a well-known JavaScript quirk - typeof null returns 'object'."
    },
    {
        question: "What is a closure in JavaScript?",
        options: [
            "A function that has access to its own scope, the outer function's variables, and global variables",
            "A way to close a web page",
            "A method for ending loops",
            "A type of JavaScript error"
        ],
        correctAnswer: 0,
        feedback: "A closure gives you access to an outer function's scope from an inner function."
    },
    {
        question: "Which of these is NOT a JavaScript framework?",
        options: [
            "React",
            "Angular",
            "Vue",
            "Flask"
        ],
        correctAnswer: 3,
        feedback: "Flask is a Python web framework, not a JavaScript framework."
    },
    {
        question: "What does 'JSON' stand for?",
        options: [
            "JavaScript Object Notation",
            "JavaScript Oriented Networking",
            "JavaScript Online Notation",
            "JavaScript Operational Network"
        ],
        correctAnswer: 0,
        feedback: "JSON stands for JavaScript Object Notation, a lightweight data interchange format."
    },
    {
        question: "Which event is triggered when a web page has finished loading?",
        options: [
            "onclick",
            "onchange",
            "onload",
            "onkeypress"
        ],
        correctAnswer: 2,
        feedback: "The onload event occurs when an object has been loaded."
    }
];

