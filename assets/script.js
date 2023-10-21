var questions = [
    {
    question: "How do you declare a constant datatype?",
    answers: [
            {text:"1. const", correct:true},
            {text:"2. var", correct:false},
            {text:"3. let", correct:false},
            {text:"4. constant", correct:false}
        ]
    },
    {
    question: "Which function is used to serialize an object into a JSON string in Javascript?",
    answers: [
            {text:"1.stringify()", correct:true},
            {text:"2. parse()", correct:false},
            {text:"3. convert()", correct:false},
            {text:"4. None of the above", correct:false}
        ]
    },
    {
        question: "What keyword is used to declare an asynchronous function in Javascript?",
        answers: [
                {text:"1. async", correct:true},
                {text:"2. await", correct:false},
                {text:"3. setTimeout", correct:false},
                {text:"4. None of the above", correct:false}
            ]
    },
    {
        question: "How to stop an interval timer in Javascript?",
        answers: [
                    {text:"1. intervalOver", correct:false},
                    {text:"2. clearTimer", correct:false},
                    {text:"3. clearInterval", correct:true},
                    {text:"4. None of the above", correct:false}
                ]
    },
    {
        question: "How do we write a comment in Javascript",
        answers: [
                    {text:"1. /**/", correct:false},
                    {text:"2. //", correct:true},
                    {text:"3. #", correct:false},
                    {text:"4. ``", correct:false}
                ]
    },
        ];

        var questionEl = document.getElementById("question");
        var answers = document.getElementById("answer-buttons");
        var scoreEl = document.getElementById("score");
        var userScore;
        var score;
        var currentQuestionIndex;
        var timeInterval;
        
        function startQuiz(){
            currentQuestionIndex = 0;
            score = 0;
            userScore = 0;
            timeLeft = 30;
            clearInterval(timeInterval);
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
                button.dataset.check= answers.correct;
                document.getElementById("answer-buttons").appendChild(button);
            }); 
           
        }
        var lastAnswer = document.getElementById("last-answer");
        answers.addEventListener("click", function(event){
            event.preventDefault();
            var selection = event.target;
            console.log(selection);
            console.log(selection.getAttribute("data-check"))
            var usersChoice = selection.getAttribute("data-check") === "true"
            console.log(typeof usersChoice)
            if(usersChoice === true){
                console.log("CORRECT!!!!!")
                lastAnswer.innerHTML = "Correct!";
                userScore++;
            }
            else{
                console.log("WRONG!!!!")
                lastAnswer.innerHTML = "Wrong!";
            }
            scoreEl.innerHTML= ("Your Score: "+ userScore);
            console.log(userScore);
            if(currentQuestionIndex < questions.length - 1){
                currentQuestionIndex++;
                showQuestion();
            }
            else{
                clearInterval(timeInterval)
                displayResults();
            }
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
         timeInterval = setInterval(function () {
              if (timeLeft > 1) {
                timeEl.textContent = timeLeft + ' seconds remaining';
                timeLeft--;
              }
            else {
                clearInterval(timeInterval);
                console.log("STOPPPPPPPP")
                timeEl.textContent = 'Times Up!';
                
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