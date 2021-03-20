//declaring global variables
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var timeEl = document.getElementById("timeLeft");
var questionContainerElement = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var shuffledQuestions, currentQuestionIndex;
var resultDisplay = document.getElementById("resultDisplay");
var submitButton = document.getElementById("submit");
var resultButton = document.getElementById("result");
var playerId = document.getElementById("playerId");
var playerScore = document.getElementById("userScore");
//var score = localStorage.getItem('score')
//command to start the game
startButton.addEventListener("click", startGame);

var mark = 0;
var gameOver = false;
// If we make timeLeft a global variable
var timeLeft;

//function of timer
function timerCountdown() {
  timeLeft = 60;
  var timeInterval = setInterval(function () {
    timeLeft--;
    timeEl.textContent = timeLeft + "seconds remaining";
    if (timeLeft > 0) {
      if (gameOver === true) {
        clearInterval(timeInterval);
        timeEl.textContent = "";
      }
    } else {
      timeEl.textContent = "";
      clearInterval(timeInterval);
      return;
    }
  }, 1000);
}

resultButton.addEventListener("click", function () {
  // Updating Game STATE
  gameOver = true;
  // HIDE the Question Container and SHOW (display) the 'resultDisplay' container
  questionContainerElement.style.display = "none";
  //resultDisplay.style.display = "block";
  // Capture Current Score
  playerScore.textContent = mark;
  // Capture the USER Initials
  playerId.textContent = "";
  // Grab a reference to the SUBMIT button
  submitButton.addEventListener("click", function () {
    playerId = submit.value;
  });
  // add an EVENT LISTENER to the BUTTON
  // within the CALLBACK function
  // Grab the VALUE from the USER INPUT (#playerId)
  // Create a TEMP OBJECT with the User Initals and User Score { "initials": "score" }
  // Save the SCORE OBJECT into Local Storage
  // resultButton.textContent = ' '
  if (timeLeft === 0 || questions === 5) {
  }
  // Display High Scores
});

submitButton.addEventListener("click", function () {
  var name = playerId.value;

  var myScore = {
    score: mark, 
    playerName: name
  }

  console.log("myScore: ", myScore)

  var localHighScores = JSON.parse(localStorage.getItem("highScores")) || [];

  console.log("localHighScores: ", localHighScores)

  localHighScores.push(myScore)

  localStorage.setItem("highScores", JSON.stringify(localHighScores));
  showHighScores();
 });

function showHighScores() {
  var localHighScores = JSON.parse(localStorage.getItem("highScores"));

  localHighScores.forEach((highScore) => {
    // create a list item
    resultDisplay.className = 'hide'
    var rankEl = document.getElementById('rank')
    var displayBest = document.createElement('li');
    // set the text to your score and playername
    displayBest.textContent = highScore.score + " | " + highScore.playerName;
    // append it somewhere on your html
   // var scoreScreen = document.getElementById("scoreList")
   rankEl.append(displayBest);
    //scoreScreen.appendChild(displayBest);
  })
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
  console.log(currentQuestionIndex);
});

function startGame() {
  mark = 0;
  gameOver = false;
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.6);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  timerCountdown();
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
    //if (question.length >= 5) {
    // resultDisplay.style.display = "flexbox"
    //}
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);

    //resultDisplay.style.display = "flexbox"
  }
}

function selectAnswer(e) {
  var selectedButton = e.target;
  var correct = selectedButton.dataset.correct;
  console.log(selectedButton);
  console.log(correct);
  setStatusClass(document.body, correct);
  // Array.from(answerButtonsElement.children).forEach(button => {
  //     setStatusClass(button, button.dataset.correct)
  // })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    //startButton.innerText = 'Restart'
    resultButton.style.display = "flex";
    resultButton.innerText = "result";
    startButton.classList.remove("hide");
  }
}

resultButton.addEventListener("click", () => {
  resultButton.style.display = "none";
  questionContainerElement.style.display = "none";
});
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct === "true") {
    element.classList.add("correct");
    mark = mark + 10;
  } else {
    element.classList.add("wrong");
    // 10 seconds will be deducted from the time each time the player get question wrong
    timeLeft = timeLeft - 10;
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

var questions = [
  {
    question: "Which of the following is not a commonly used data type?",
    answers: [
      { text: "Alerts", correct: true },
      { text: "Numbers", correct: false },
      { text: "Booleans", correct: false },
      { text: "Strings", correct: false },
    ],
  },
  {
    question: "Which of the following is primiarily used for styling web page?",
    answers: [
      { text: "HTML", correct: false },
      { text: "JavaScript", correct: false },
      { text: "Python", correct: false },
      { text: "CSS", correct: true },
    ],
  },
  {
    question: "What does DOM stand for?",
    answers: [
      { text: "Document Object Management", correct: false },
      { text: "Display Ordinance Model", correct: false },
      { text: "Digital Operating Model", correct: false },
      { text: "Document Object Model", correct: true },
    ],
  },
  {
    question: "What does JS stand for?",
    answers: [
      { text: "JavaScript", correct: true },
      { text: "Java Structure", correct: false },
      { text: "Junk Sheet", correct: false },
      { text: "Junior Sript", correct: false },
    ],
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Highway Tricks Management Language", correct: false },
      { text: "Hypertext Markup Language", correct: true },
      { text: "Hughe Triangle Manual Learning", correct: false },
      { text: "High Task Mark Lane", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Conducing Styling Structure", correct: false },
      { text: "Compact sheets Structure", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Color Shape Smartsheet", correct: true },
    ],
  },
];
