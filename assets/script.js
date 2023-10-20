var questions = [
    {
    question: "How do you declare a constant datatype?",
    answers: [
            {text:"const", correct:true},
            {text:"var", correct:false},
            {text:"let", correct:false},
            {text:"constant", correct:false}
        ]
    },
    {
    question: "Which function is used to serialize an object into a JSON string in Javascript?",
    answers: [
            {text:"stringify()", correct:true},
            {text:"parse()", correct:false},
            {text:"convert()", correct:false},
            {text:"None of the above", correct:false}
        ]
    },
    {
        question: "What keyword is used to declare an asynchronous function in Javascript?",
        answers: [
                {text:"async", correct:true},
                {text:"await", correct:false},
                {text:"setTimeout", correct:false},
                {text:"None of the above", correct:false}
            ]
    },
    {
        question: "How to stop an interval timer in Javascript?",
        answers: [
                    {text:"intervalOver", correct:false},
                    {text:"clearTimer", correct:false},
                    {text:"clearInterval", correct:true},
                    {text:"None of the above", correct:false}
                ]
    },
    {
        question: "How do we write a comment in Javascript",
        answers: [
                    {text:"/**/", correct:false},
                    {text:"//", correct:true},
                    {text:"#", correct:false},
                    {text:"``", correct:false}
                ]
    },
        ];

        var questionEl = document.getElementById("question");
        var answers = document.getElementById("answer-buttons");
        var scoreEl = document.getElementById("score");
        
        function startQuiz(){
            currentQuestionIndex = 0;
            score = 0;
            countdown();
            showQuestion();
        }

        const startButton = document.getElementById('startButton');

        startButton.addEventListener('click', startQuiz);
        
        function showQuestion(){
            resetState();
            let currentQuestion = questions[currentQuestionIndex];
            let questionNo = currentQuestionIndex + 1;
            questionEl.innerHTML = questionNo + ": " + currentQuestion.question;
        
            currentQuestion.answers.forEach(answers => {
                const button = document.createElement("button");
                button.innerHTML = answers.text;
                button.classList.add("btn");
                document.getElementById("answer-buttons").appendChild(button);
            }); 
           
        }
        var lastAnswer = document.getElementById("last-answer");
        answers.addEventListener("click", function(event){
            event.preventDefault();
            var selection = event.target
            currentQuestionIndex++;
            console.log(selection);
            if(selection.dataset.correct=true){
                lastAnswer.innerHTML = "Correct!";
                var userScore = score++;
            }
            else{
                lastAnswer.innerHTML = "Wrong!";
            }
            showQuestion();
            scoreEl.innerHTML= ("Your Score: "+ userScore);
            console.log(userScore);
           })
        
        
        
        function resetState(){
            while(answers.firstChild){
                answers.removeChild(answers.firstChild);
            }
        }
        
        var timeLeft = 30;
        var timeEl = document.querySelector(".time");
        
        function countdown() {
          timeEl.textContent = timeLeft + " seconds remaining"
            var timeInterval = setInterval(function () {
              if (timeLeft > 1) {
                timeEl.textContent = timeLeft + ' seconds remaining';
                timeLeft--;
              } else if (timeLeft === 1) {
                timeEl.textContent = timeLeft + ' second remaining';
                timeLeft--;
              } else {
                timeEl.textContent = 'Times Up!';
                clearInterval(timeInterval);
                displayResults();
              }
            }, 1000);
          }

          function displayResults(){
            var user = window.prompt("Enter your initials to record your score!");
            questionEl.innerHTML = "You completed the quiz!";
            answers.innerHTML = "Press start to go again!";
            lastAnswer.innerHTML = " ";
           localStorage.setItem("User", user);
           localStorage.setItem("Score",userScore);
           }
           
           function viewHighScores(){
               var finalScore = localStorage.getItem("User","Score");
               lastAnswer.innerHTML= finalScore;
           }