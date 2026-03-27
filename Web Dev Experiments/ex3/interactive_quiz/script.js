// Quiz questions stored in an array
const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks and Text Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "CSS", "Java"],
        answer: 1
    },
    {
        question: "Which language adds interactivity to websites?",
        options: ["CSS", "HTML", "JavaScript"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

// Load first question
loadQuestion();

function loadQuestion() {
    optionsEl.innerHTML = "";

    const current = quizData[currentQuestion];
    questionEl.innerText = current.question;

    current.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.innerHTML = `
            <input type="radio" name="option" value="${index}">
            ${option}
        `;
        optionsEl.appendChild(label);
    });
}

nextBtn.addEventListener("click", function () {
    const selected = document.querySelector('input[name="option"]:checked');

    if (!selected) {
        alert("Please select an option");
        return;
    }

    if (parseInt(selected.value) === quizData[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizBox.style.display = "none";
    resultBox.style.display = "block";

    scoreEl.innerText = `Your Score: ${score} / ${quizData.length}`;

    if (score === quizData.length) {
        messageEl.innerText = "Excellent!";
    } else if (score >= 2) {
        messageEl.innerText = "Good job!";
    } else {
        messageEl.innerText = "Try Again!";
    }
}

restartBtn.addEventListener("click", function () {
    currentQuestion = 0;
    score = 0;
    resultBox.style.display = "none";
    quizBox.style.display = "block";
    loadQuestion();
});
