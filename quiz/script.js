const API_URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";

let currentQuestionIndex = 0;
let questions = [];
let score = 0;
let timerInterval;
let userAnswers = [];

const timeLimit = 60; // 60 seconds per question
let timeLeft = timeLimit;

document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz-container");
    const startButton = document.createElement("button");
    const questionElement = document.createElement("p");
    const optionsElement = document.createElement("div");
    const scoreElement = document.createElement("p");
    const timerElement = document.createElement("p");

    questionElement.id = "question";
    optionsElement.id = "options";
    scoreElement.id = "score";
    timerElement.id = "timer";

    startButton.textContent = "Start Exam";
    startButton.classList.add("btn", "btn-primary", "w-100", "mb-3"); // Styled button
    quizContainer.appendChild(startButton);

    startButton.addEventListener("click", () => {
        startButton.style.display = "none";
        quizContainer.appendChild(scoreElement);
        quizContainer.appendChild(timerElement);
        quizContainer.appendChild(questionElement);
        quizContainer.appendChild(optionsElement);
        fetchQuestions();
    });
    function fetchQuestions() {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                questions = data.results.map(q => ({
                    ...q,
                    question: cleanText(decodeHTML(q.question)),
                    correct_answer: cleanText(decodeHTML(q.correct_answer)),
                    incorrect_answers: q.incorrect_answers.map(ans => cleanText(decodeHTML(ans)))
                }));
                // resetQuiz(); // Ensure fresh start
                showQuestion();
                startTimer();
            })
            .catch(error => console.error("Error fetching questions:", error));
    }

    function decodeHTML(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    function cleanText(text) {
        return text.replace(/[@#$%^&*<>]/g, ""); // Removes unwanted special characters
    }


    function startTimer() {
        timeLeft = timeLimit;
        updateTimer();

        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimer();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                moveToNextQuestion();
            }
        }, 1000);
    }

    function updateTimer() {
        timerElement.textContent = `Time left: ${timeLeft}s`;
    }

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = "";

        const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
            .sort(() => Math.random() - 0.3);

        answers.forEach(answer => {
            const button = document.createElement("button");
            button.textContent = answer;
            button.classList.add("btn", "btn-outline-primary", "w-100", "mb-2");
            button.addEventListener("click", () => selectAnswer(button, currentQuestion.correct_answer));
            optionsElement.appendChild(button);
        });

        startTimer();
    }

    function selectAnswer(button, correctAnswer) {
        const options = document.querySelectorAll("#options button");
        options.forEach(option => {
            option.disabled = true;
            if (option.textContent === correctAnswer) {
                option.classList.replace("btn-outline-primary", "btn-success");
            } else {
                option.classList.replace("btn-outline-primary", "btn-danger");
            }
        });

        userAnswers.push({
            question: questions[currentQuestionIndex].question,
            correctAnswer: correctAnswer,
            userAnswer: button.textContent
        });

        if (button.textContent === correctAnswer) {
            score++;
        }

        scoreElement.textContent = `Score: ${score}`;
        setTimeout(() => {
            moveToNextQuestion();
        }, 3000);
    }

    function moveToNextQuestion() {
        currentQuestionIndex++;
        clearInterval(timerInterval);

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        clearInterval(timerInterval);
        quizContainer.innerHTML = "";

        const header = document.createElement("h1");
        header.textContent = "Computer Science Quiz";

        const completionText = document.createElement("h3");
        completionText.textContent = "Quiz Completed!";

        const resultSummary = document.createElement("h2");
        resultSummary.textContent = `Your Score: ${score} / ${questions.length}`;

        const resultButton = document.createElement("button");
        resultButton.textContent = "Download Score Card";
        resultButton.classList.add("btn", "btn-primary", "w-100", "mb-3");
        resultButton.addEventListener("click", () => {
            const blob = new Blob([
                `Computer Science Quiz\n\nYour Score: ${score} / ${questions.length}\n\n` +
                userAnswers.map((item, index) => `Q${index + 1}: ${item.question}\nYour Answer: ${item.userAnswer}\nCorrect Answer: ${item.correctAnswer}\n\n`).join("")
            ], { type: "text/plain" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "cs-quiz-results.txt";
            link.click();
        });

        quizContainer.appendChild(header);
        quizContainer.appendChild(completionText);
        quizContainer.appendChild(resultSummary);
        quizContainer.appendChild(resultButton);
    }

    function resetQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        scoreElement.textContent = `Score: ${score}`;
        timerElement.textContent = `Time left: ${timeLimit}s`;
    }
});
