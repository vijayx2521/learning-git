let quizHistory = [];

// Toggle between login and signup
document.getElementById('showSignup').onclick = function() {
  document.getElementById('loginContainer').style.display = 'none';
  document.getElementById('signupContainer').style.display = 'block';
};
document.getElementById('showLogin').onclick = function() {
  document.getElementById('signupContainer').style.display = 'none';
  document.getElementById('loginContainer').style.display = 'block';
};

// Handle login and signup forms
document.getElementById('loginForm').onsubmit = function(e) {
  e.preventDefault();
  document.getElementById('loginContainer').style.display = 'none';
  document.getElementById('courseSelectionContainer').style.display = 'block';
};
document.getElementById('signupForm').onsubmit = function(e) {
  e.preventDefault();
  alert('Signup successful!');
  document.getElementById('signupContainer').style.display = 'none';
  document.getElementById('courseSelectionContainer').style.display = 'block';
};

// Course selection logic
function startLearning() {
  const selectedCourse = document.getElementById('courseSelect').value;
  if (selectedCourse) {
    document.getElementById('courseSelectionContainer').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    startQuiz();
  }
}

// Quiz logic
const quizQuestions = [
  {
    question: "What is the first step in the Data Science workflow?",
    options: ["Data Collection", "Data Cleaning", "Model Training", "Data Visualization"],
    correctAnswer: "Data Collection"
  },
  {
    question: "Which algorithm is used in supervised learning?",
    options: ["K-Means", "Linear Regression", "DBSCAN", "K-NN"],
    correctAnswer: "Linear Regression"
  }
];

function startQuiz() {
  const quizContainer = document.getElementById('quizContainer');
  const quizQuestionsContainer = document.getElementById('quizQuestions');
  quizQuestionsContainer.innerHTML = '';

  quizQuestions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.innerHTML = `<p>${question.question}</p>`;
    question.options.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.innerHTML = `<input type="radio" name="question${index}" value="${option}"> ${option}`;
      questionElement.appendChild(optionElement);
    });
    quizQuestionsContainer.appendChild(questionElement);
  });
}

function submitQuiz() {
  const allRadios = document.querySelectorAll('input[type="radio"]:checked');
  let score = 0;

  allRadios.forEach(radio => {
    const questionIndex = radio.name.replace('question', '');
    if (radio.value === quizQuestions[questionIndex].correctAnswer) {
      score++;
    }
  });

  const scoreText = `You scored ${score} out of ${quizQuestions.length}`;
  document.getElementById('quizScore').textContent = scoreText;

  // Store quiz performance
  quizHistory.push({ score, total: quizQuestions.length });

  // Generate score chart
  const ctx = document.getElementById('scoreChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Correct', 'Incorrect'],
      datasets: [{
        data: [score, quizQuestions.length - score],
        backgroundColor: ['#28a745', '#dc3545'],
      }]
    }
  });

  document.getElementById('quizContainer').style.display = 'none';
  document.getElementById('quizResultsContainer').style.display = 'block';
}

function showQuizDashboard() {
  document.getElementById('quizResultsContainer').style.display = 'none';
  document.getElementById('quizDashboardContainer').style.display = 'block';
  
  const totalQuizzes = quizHistory.length;
  const correctAnswers = quizHistory.reduce((acc, quiz) => acc + quiz.score, 0);
  const totalQuestions = quizHistory.reduce((acc, quiz) => acc + quiz.total, 0);

  // Display total quizzes and correct answers
  document.getElementById('totalQuizzes').textContent = `Total Quizzes Taken: ${totalQuizzes}, Total Correct Answers: ${correctAnswers} out of ${totalQuestions}`;

  // Calculate the user's level
  const performancePercentage = (correctAnswers / totalQuestions) * 100;
  let level = '';
  let recommendedCourse = '';

  if (performancePercentage < 40) {
    level = 'Beginner';
    recommendedCourse = 'Introduction to Python';
  } else if (performancePercentage < 70) {
    level = 'Intermediate';
    recommendedCourse = 'Data Analysis with Pandas';
  } else {
    level = 'Advanced';
    recommendedCourse = 'Deep Learning with TensorFlow';
  }

  // Display the user's level and course recommendation
  document.getElementById('userLevel').textContent = `Your Level: ${level}`;
  document.getElementById('recommendedCourse').textContent = `Recommended Course: ${recommendedCourse}`;

  // Display quiz performance chart
  const ctx = document.getElementById('quizPerformanceChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Total Correct Answers', 'Total Questions'],
      datasets: [{
        label: 'Quiz Performance',
        data: [correctAnswers, totalQuestions],
        backgroundColor: ['#28a745', '#ffc107'],
      }]
    }
  });
}

function restartCourse() {
  document.getElementById('quizResultsContainer').style.display = 'none';
  document.getElementById('quizDashboardContainer').style.display = 'none';
  document.getElementById('courseSelectionContainer').style.display = 'block';
}

