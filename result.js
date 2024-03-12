
const quizQuestions = [
    { type: 'trueFalse', question: 'Bạn nghĩ gì về khái niệm tình yêu đích thực?', answer: "A" },
    { type: 'trueFalse', question: 'Tình yêu của bạn được mô tả như thế nào?', answer: "B" },
    { type: 'trueFalse', question: 'Bạn nghĩ gì về việc chia sẻ mọi thứ trong một mối quan hệ?', answer: "A" },
    { type: 'trueFalse', question: 'Điều gì khiến bạn cảm thấy hạnh phúc trong mối quan hệ?', answer: "B" },
    { type: 'trueFalse', question: 'Bạn nghĩ gì về khái niệm tình yêu đích thực?', answer: "B" },
    { type: 'trueFalse', question: 'Tình yêu của bạn được mô tả như thế nào?', answer: "A" },
    { type: 'trueFalse', question: 'Bạn nghĩ gì về việc chia sẻ mọi thứ trong một mối quan hệ?', answer: "B" },
    { type: 'trueFalse', question: 'Điều gì khiến bạn cảm thấy hạnh phúc trong mối quan hệ?', answer: "B" },
    { type: 'trueFalse', question: 'Bạn nghĩ gì về khái niệm tình yêu đích thực?', answer: "B" },
    { type: 'trueFalse', question: 'Tình yêu của bạn được mô tả như thế nào?', answer: "A" },




  ];
  
  let userAnswers = [];
  


  function startQuiz() {
    const studentInfoForm = document.getElementById('studentInfoForm');
    const quizContainer = document.getElementById('quizContainer');
  
    studentInfoForm.classList.add('hidden');
    quizContainer.classList.remove('hidden');
  
    generateQuizQuestions();
  }
  

  function checkAnswers() {
    for (let i = 0; i < quizQuestions.length; i++) {
      const questionType = quizQuestions[i].type;
      const inputName = `q${i}`;

      if (questionType === 'trueFalse' || questionType === 'multipleChoice') {
        const selectedOption = document.querySelector(`input[name="${inputName}"]:checked`);
        if (!selectedOption) {
          alert(`Bạn chưa trả lời câu hỏi ${i + 1}`);
          return false; 
        }
      } else if (questionType === 'multipleSelect') {
        const selectedOptions = document.querySelectorAll(`input[name="${inputName}"]:checked`);
        if (selectedOptions.length === 0) {
          alert(`Bạn chưa trả lời câu hỏi ${i + 1}`);
          return false; 
        }
      } else if (questionType === 'essay') {
        const essayAnswer = document.querySelector(`textarea[name="${inputName}"]`);
        if (!essayAnswer.value.trim()) {
          alert(`Bạn chưa trả lời câu hỏi ${i + 1}`);
          return false; 
        }
      }
    }
  
    alert('Ấn Ok để xác nhận nộp bài');
    return true;
  }

  function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    var x = setInterval(function () {
      hours = parseInt(timer / 3600, 10);
      minutes = parseInt((timer % 3600) / 60, 10);
      seconds = parseInt(timer % 60, 10);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      
      if(timer >= 0){
        display.textContent = hours + ":" + minutes + ":" + seconds;
      }
      

      if (timer < 0) {
        
        
        clearInterval(x);
        window.alert("Đã Hết Thời Gian Làm Bài! Nhấn OK để nộp bài thi!");
        submitQuizTimeEnd();
        // Implement the code to handle the timer reaching zero
        // Example: alert('Time's up! Submit the quiz.');
      }
      else{
          timer--;
      }
    }, 1000);
  }

  function generateQuizQuestions() {
    const quizContainer = document.getElementById('quizContainer');
    document.getElementById('showquiz').style.display = 'none';
    document.getElementById('submit').style.display = 'block';

    const timerContainer = document.getElementById('timerContainer');
    const timerDisplay = document.createElement('span');
    timerDisplay.id = 'timerDisplay';
    timerContainer.appendChild(timerDisplay);

    startTimer(60, document.getElementById('timerDisplay'));
  
    quizContainer.innerHTML = '';
  
    for (let i = 0; i < quizQuestions.length; i++) {
      const questionElement = document.createElement('div');
      questionElement.innerHTML = `<p>${i + 1}. ${quizQuestions[i].question}</p>`;
  
      if (quizQuestions[i].type === 'trueFalse') {
        questionElement.innerHTML += `
          <label><input type="radio" name="q${i}" value="A"> A.Mình Nghĩ Là Cần</label>
          <label><input type="radio" name="q${i}" value="B"> B.Mình Nghĩ Là Không Cần</label>
        `;
      } else if (quizQuestions[i].type === 'multipleChoice') {
        for (let j = 0; j < quizQuestions[i].options.length; j++) {
          questionElement.innerHTML += `
            <label><input type="radio" name="q${i}" value="${quizQuestions[i].options[j]}"> ${quizQuestions[i].options[j]}</label>
          `;
        }
      } else if (quizQuestions[i].type === 'multipleSelect') {
        for (let j = 0; j < quizQuestions[i].options.length; j++) {
          questionElement.innerHTML += `
            <label><input type="checkbox" name="q${i}" value="${quizQuestions[i].options[j]}"> ${quizQuestions[i].options[j]}</label>
          `;
        }
      } else if (quizQuestions[i].type === 'essay') {
        questionElement.innerHTML += `
          <textarea name="q${i}" rows="4" cols="50" placeholder="Nhập câu trả lời"></textarea>
        `;
      }
  
      quizContainer.appendChild(questionElement);
      var button = document.getElementById('showquiz');
      if (button) {
            button.style.display = 'none';
        }
      
    }
    var button = document.getElementById('showquiz');
      if (button) {
            button.style.display = 'none';
      }
      document.getElementById('submit').style.display = 'block';
  }
  
  function submitQuiz() {
    if(checkAnswers()){
      var correctCount = 0;
      var wrongCount = 0;
      const quizContainer = document.getElementById('quizContainer');
      const resultContainer = document.getElementById('resultContainer');
    
      userAnswers = [];
      for (let i = 0; i < quizQuestions.length; i++) {
        const questionType = quizQuestions[i].type;
        const answerElement = document.querySelector(`input[name="q${i}"]:checked`);
        window.alert(answerElement.value);
        userAnswers.push({ question: i + 1, type: questionType, answer: answerElement.value });
      }
      localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
      const correct_answer = ["Answer Correct", "Answer Wrong"];

      for (let i = 0; i < userAnswers.length; i++) {
        // Chuyển đổi userAnswer sang kiểu boolean
        const userAnswer = userAnswers[i].answer;
    
        // Lấy giá trị correctAnswer từ mảng quizQuestions
        const correctAnswer = quizQuestions[i].answer;
    
        // Debug: Hiển thị giá trị userAnswer và correctAnswer
    
        // So sánh giữa userAnswer và correctAnswer
        if (userAnswer === correctAnswer) {
            correctCount++;
        } else {
            wrongCount++;
        }
    
        // Debug: Hiển thị số câu đúng và sai
      }

      localStorage.setItem('correctCount', correctCount);
      localStorage.setItem('wrongCount', wrongCount);
      window.location.href = 'result.html';

    }
  }

  function submitQuizTimeEnd() {
    
      var correctCount = 0;
      var wrongCount = 0;
      const quizContainer = document.getElementById('quizContainer');
      const resultContainer = document.getElementById('resultContainer');
    
      userAnswers = [];
      for (let i = 0; i < quizQuestions.length; i++) {
        const questionType = quizQuestions[i].type;
        const answerElement = document.querySelector(`input[name="q${i}"]:checked, textarea[name="q${i}"]`);
    
        if (answerElement) {
          if (questionType === 'multipleSelect') {
            const selectedOptions = Array.from(document.querySelectorAll(`input[name="q${i}"]:checked`)).map(option => option.value);
            userAnswers.push({ question: i + 1, type: questionType, answer: selectedOptions });
          } else {
            userAnswers.push({ question: i + 1, type: questionType, answer: answerElement.value });
          }
        }
      }
      localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
      const correct_answer = ["Answer Correct", "Answer Wrong"];

      for (let i = 0; i < userAnswers.length; i++) {
      const userAnswer = userAnswers[i];
      const correctAnswer = quizQuestions[i].answer;

      if (userAnswer == correctAnswer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    }

      localStorage.setItem('correctCount', correctCount);
      localStorage.setItem('wrongCount', wrongCount);
      window.location.href = 'result.html';

    
  }


  document.addEventListener('DOMContentLoaded', function () {
    const correctCountElement = document.getElementById('correctCount');
    const wrongCountElement = document.getElementById('wrongCount');
    const chartContainer = document.getElementById('chartContainer');
    const correctPoint = document.getElementById('correctPoint');
    const name_sv = document.getElementById("name_student");
  
    const correctCount = localStorage.getItem('correctCount');
    const wrongCount = localStorage.getItem('wrongCount');
    const name =   localStorage.getItem('username')
    

    const totalScore = 7 * 1;

    name_sv.innerHTML = `Chúc Mừng Bạn Đã Hoàn Thành Bài Thi!`;
    correctPoint.innerHTML = `Điểm: <span>${totalScore}</span>`;
    correctCountElement.innerHTML = `Số câu đúng: <span>${7}</span>`;
    wrongCountElement.innerHTML = `Số câu sai: <span>${3}</span>`;
  
    const ctx = document.getElementById('myDoughnutChart').getContext('2d');
    const doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Đúng', 'Sai'],
        datasets: [{
          data: [7, 3],
          backgroundColor: ['#2ecc71', '#e74c3c'],
        }],
      },
    });
  
    chartContainer.style.display = 'block';
    const questionListElement = document.getElementById('questionList');
    let storedUserAnswers = localStorage.getItem('userAnswers');
    if (storedUserAnswers) {
      userAnswers = JSON.parse(storedUserAnswers);
    } else {
      userAnswers = [];
    }
  // Hiển thị danh sách câu hỏi
    for (let i = 0; i < quizQuestions.length; i++) {
      
      const questionData = quizQuestions[i];

      const questionDiv = document.createElement('div');
      const checkIcon = document.createElement('i');
      
      if(userAnswers[i].answer === quizQuestions[i].answer){
        checkIcon.className = 'check-icon';
        if (userAnswers[i].answer === "A"){
          questionDiv.innerHTML = `<p>Câu ${i+1}: ${questionData.question} <span style = "color:green">Đáp Án: A</span></p>`;
        }
        else{
          questionDiv.innerHTML = `<p>Câu ${i+1}: ${questionData.question} <span style = "color:green">Đáp Án: B</span></p>`;
        }
        questionDiv.appendChild(checkIcon);

        questionListElement.appendChild(questionDiv);
      }
      // Lấy giá trị correctAnswer từ mảng quizQuestions
      else{
        checkIcon.className = 'check-icon-red';
        questionDiv.innerHTML = `<p>Câu ${i+1}: ${questionData.question} <span style = "color:green">Đáp Án Đúng: ${quizQuestions[i].answer}</span></p>`;
        questionDiv.appendChild(checkIcon);

        questionListElement.appendChild(questionDiv);
      }
     
      
    }
  });
  
  