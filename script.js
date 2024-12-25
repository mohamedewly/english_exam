const questions = [
    { type: "choose", question: "I and my friend are planning to ______ to the park.", options: ["go", "gone", "going"], answer: "go" },
    { type: "choose", question: "They ______ playing football when it started to rain.", options: ["was", "were", "are"], answer: "were" },
    { type: "choose", question: "I and my family are ______ to go to the amusement park.", options: ["go", "gone", "going"], answer: "going" },
    { type: "choose", question: "She ______ to the market yesterday.", options: ["goes", "went", "going"], answer: "went" },
    { type: "choose", question: "He ______ playing football when it started to rain.", options: ["was", "were", "are"], answer: "was" },
    { type: "choose", question: "The waste of the factory ______ the river.", options: ["pollutes", "dirties", "wastes"], answer: "pollutes" },
    { type: "choose", question: "Margie didn't learn French ______ she lived in Paris for a year.", options: ["because", "before", "therefore"], answer: "before" },
    { type: "choose", question: "The emperor ______ the sounds of wind blowing through the garden.", options: ["saw", "tasted", "heard"], answer: "heard" },
    { type: "choose", question: "I have been sitting here ______ three hours.", options: ["for", "since", "about"], answer: "for" },
    { type: "choose", question: "I went home late at night and woke up the next morning to find that my house ((had been robbed)).", options: ["true", "false"], answer: "true" },
    // Fill-in-the-blank questions
    { type: "fill", question: "Dian is _______ (go) abroad next week.", correctAnswer: "going" },
    { type: "fill", question: "She ______ (write) a letter when the phone rang.", correctAnswer: "was writing" },
    { type: "fill", question: "I ______ (sleep) when the thieves came.", correctAnswer: "was sleeping" },
    { type: "fill", question: "She was a having dinner when the phone ______ (ring).", correctAnswer: "rang" },
    { type: "fill", question: "He was taking a lesson when he realized that he ______ (was forgetting) to bring his book.", correctAnswer: "had forgotten" },

  ];
  
  const questionsContainer = document.getElementById("questions-container");
  const scoreContainer = document.getElementById("score-container");
  const submitBtn = document.getElementById("submit-btn");
  const showAnswersBtn = document.getElementById("show-answers-btn");
  const restartBtn = document.getElementById("restart-btn");
  const studentNameInput = document.getElementById("student-name");
  
  // Load questions
  function loadQuestions() {
    questionsContainer.innerHTML = "";
    questions.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");
  
      const questionText = document.createElement("p");
      questionText.textContent = `${index + 1}. ${q.question}`;
  
      let inputElement;
  
      if (q.type === "choose") {
        inputElement = document.createElement("select");
        inputElement.dataset.index = index;
        inputElement.innerHTML = `<option value="">Select an answer</option>` +
          q.options.map(option => `<option value="${option}">${option}</option>`).join("");
      } else if (q.type === "fill") {
        inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.dataset.index = index;
        inputElement.placeholder = "Type your answer here";
      }
  
      questionDiv.appendChild(questionText);
      questionDiv.appendChild(inputElement);
      questionsContainer.appendChild(questionDiv);
    });
  }
  
  // Calculate score
  function calculateScore() {
    let score = 0;
    questions.forEach((q, index) => {
      const input = document.querySelector(`[data-index="${index}"]`);
      const userAnswer = input.value.trim().toLowerCase();
  
      if (q.type === "choose" && userAnswer === q.answer.toLowerCase()) {
        score++;
        input.classList.add("correct");
        input.classList.remove("incorrect");
      } else if (q.type === "fill" && userAnswer === q.correctAnswer.toLowerCase()) {
        score++;
        input.classList.add("correct");
        input.classList.remove("incorrect");
      } else {
        input.classList.add("incorrect");
        input.classList.remove("correct");
      }
    });
    return score;
  }
  
  // Show answers
  function showAnswers() {
    questions.forEach((q, index) => {
      const input = document.querySelector(`[data-index="${index}"]`);
      if (q.type === "choose") {
        input.value = q.answer;
      } else if (q.type === "fill") {
        input.value = q.correctAnswer;
      }
      input.classList.add("correct");
      input.disabled = true;
    });
  }
  
  // Reset the exam
  function restartExam() {
    loadQuestions();
    scoreContainer.textContent = "";
    studentNameInput.value = "";
  }
  
  // Event listeners
  submitBtn.addEventListener("click", () => {
    const studentName = studentNameInput.value.trim();
    if (!studentName) {
      alert("Please enter your name before submitting!");
      return;
    }
  
    const score = calculateScore();
    scoreContainer.textContent = `Your score, ${studentName}, is ${score} out of ${questions.length}.`;
  });
  
  showAnswersBtn.addEventListener("click", showAnswers);
  restartBtn.addEventListener("click", restartExam);
  
  // Initial load
  loadQuestions();
  