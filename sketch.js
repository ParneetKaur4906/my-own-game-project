//creates a constant for start
const start = document.getElementById("start");
//creates a constant for quiz
const quiz = document.getElementById("quiz");
//cretes a constant for question
const question = document.getElementById("question");
//creates a constant for question image
const qImg = document.getElementById("qImg");
//creates a constant for 1st choice
const choiceA = document.getElementById("A");
//creates a constant for 2nd choice
const choiceB = document.getElementById("B");
//creates a constant for 3rd choice
const choiceC = document.getElementById("C");
//creates a constant for counter
const counter = document.getElementById("counter");
//creates a constant for time guage
const timeGauge = document.getElementById("timeGauge");
//creates a constant for progress
const progress = document.getElementById("progress");
//creates a constant fpr score
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "If 1=5, 2=15, 3=215, Then 5=?",
        choiceA : "3215",
        choiceB : "4215",
        choiceC : "1",
        correct : "C"
    },{
        question : "Can you solve this question?2+4/2+5",
        choiceA : "8",
        choiceB : "9",
        choiceC : "10",
        correct : "B"
    },{
        question : "Which shape has most sides?",
        choiceA : "Decagon",
        choiceB :  "Nonagon",
        choiceC :  "Circle",
        correct : "C"
    },{
        question : "1+2=21,2+3=36,3+4=43,4+5=?",
        choiceA : "9",
        choiceB : "58",
        choiceC : "54",
        correct :  "A"
    },{
        question : "What comes after AEBFC?",
        choiceA : "D",
        choiceB : "H",
        choiceC : "G",
        correct : "C"
    },{
        question : "If CDE=EDF, then EFH=?",
        choiceA : "HFI",
        choiceB : "FEH",
        choiceC : "EHF",
        correct : "A"
    },{
        question : "What is the minimum cuts needed to cut a circle into 8 equal parts?",
        choiceA : "3",
        choiceB : "1",
        choiceC : "4",
        correct : "B"
    },{
        question : "In writing all of integers from 1 to 199, how many times is '1' used?",
        choiceA : "121",
        choiceB : "111",
        choiceC : "140",
        correct : "C"
    },{
        question : "The old lady has 7 sons, and each son have a sister, so how many children does the old lady have?",
        choiceA : "14",
        choiceB : "8",
        choiceC : "0",
        correct : "B"
    },{  
        question : "Which is the longest?",
        choiceA : "March",
        choiceB : "April",
        choiceC : "February",
        correct : "C"
    },{
        question : "I don't speak,I cannot hear, but I always tell the truth.",
        choiceA : "Fish",
        choiceB : "The watch",
        choiceC : "The mirror",
        correct : "C"
    },{
        question : "If you pass out the 2nd person in a race, what position are you?",
        choiceA : "2nd",
        choiceB : "1st",
        choiceC : "3rd",
        correct : "A"
    },{
        question : "Mary's father had 5 children- Mimi,Mumu,Mama,Meme. What was the 5th child's name? ",
        choiceA : "Momo",
        choiceB : "Mary",
        choiceC : "Impossible to know",
        correct : "B"
    },{
        question : "What is between the paris",
        choiceA : "Eiffel Tower",
        choiceB : "France",
        choiceC : "R",
        correct : "C"
    },{
        question : "How many soccer players should each team have ",
        choiceA : "",
        choiceB : "",
        choiceC : "",
        correct : ""
    }
];

// create some variables
const lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
var TIMER;
var score = 0;

// render a question
function renderQuestion(){
    var q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}
//adds a listener 
start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); //1000ms = 1s
}

// render progress
function renderProgress(){
    for(var qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    //sets the color of running question to green
    document.getElementById(runningQuestion).style.backgroundColor = "green";
}

// answer is Wrong
function answerIsWrong(){
    //sets the color of running question to red
    document.getElementById(runningQuestion).style.backgroundColor = "red";
}

// score render
function scoreRender(){
    
    scoreDiv.style.display = "block";
    
   //calculates the percentage of scorex
    const scorePerCent = Math.round(100 * score/questions.length);                                                  
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}



















