var q1 = {
    question: "Which country won the 2019 Woman's World Cup?",
    a: "Netherlands",
    b: "USA",
    c: "France",
    d: "Argentina",
    correct: "b"
}
var q2 = {
    question: "Which player was dubbed the 'Secretary of Defense' during the 2014 Men's World Cup?",
    a: "Guillermo Ochoa",
    b: "Manuel Neuer",
    c: "Tim Howard",
    d: "Vincent Enyeama",
    correct: "c"
}
var q3 = {
    question: "Which country placed 3rd at their first appearance at the 1998 Men's World Cup?",
    a: "Croatia",
    b: "Uruguay",
    c: "South Korea",
    d: "Jamaica",
    correct: "a"
}
var q4 = {
    question: "What was the score of the France v. Croatia 2018 Men's World Cup Final?",
    a: "3-3",
    b: "4-2",
    c: "2-4",
    d: "1-0",
    correct: "b"
}
var q5 = {
    question: "What does FIFA stand for?",
    a: "International Federation of Football Association",
    b: "Federación Internacional de la Asociación de Fútbol",
    c: "Football Is F**king Awesome",
    d: "Fédération Internationale de Football Association",
    correct: "d"
}
var q6 = {
    question: "Which country has played in every World Cup?",
    a: "Argentina",
    b: "Brazil",
    c: "England",
    d: "Spain",
    correct: "b"
}
var q7 = {
    question: "Which player has the record for most goals scored at the World Cup?",
    a: "Pelé",
    b: "Gerd Müller",
    c: "Ronaldo",
    d: "Miroslav Klose",
    correct: "d"
}
var q8 = {
    question: "Which company makes the official ball for the World Cup?",
    a: "Puma",
    b: "Nike",
    c: "Adidas",
    d: "Umbro",
    correct: "c"
}

var questions = [q6,q2,q8,q4,q1,q7,q3,q5]

var correct = 0
var incorrect = 0
var unanswered = 0

/*
start button only - click then reveal questions and answers
timer starts counting down from 30sec
    - if user selects correct answer - change color to green
    - automatically moves to next question after 3sec
    - time resets after each question
if timer runs out answer is revealed
    - automatically moves to next question after 3sec
each question-answer is an obj 
    - loop thru questions - load into html slots
    - create function to check if answer is correct


*/

var qTimer;
var time = 30;
var choiceLock = false;
var timeUp;
var q;
var qList;
var reload;
var newQues;

$(document).ready(function(){
    $(".game-content").hide()   //hide q&a html
    $(".result").hide()
    

    function load(){
        // console.log("qList " + qList.length)
        if(qList.length > 0){
            console.log("time left "+time)
            timeUp = setTimeout(noAnswer, 31000)
            console.log("load successful") 
            q = qList[qList.length - 1]        // pick question from temp list
            qList.pop(q)                       // remove question from temp list after use

            $(".question").text(q.question)    // load questions & answers into html
            $(".choice-a").text(q.a)            
            $(".choice-b").text(q.b)
            $(".choice-c").text(q.c)
            $(".choice-d").text(q.d)
            $("li").css("color","black")

            time = 30                           // reset timer
            $(".time-left").text(timeConverter(time))
            clearInterval(qTimer)
            qTimer = setInterval(count, 1000)
            choiceLock = false                  // unlock answer select
        }

        else {
            console.log("game over")
            $(".game-content").hide()
            $(".result").show()
            $(".question").text("Results")
            $(".correct").text(correct)
            $(".incorrect").text(incorrect)
            $(".unanswered").text(unanswered)
            correct = 0                         // reset scores
            incorrect = 0
            unanswered = 0
            
        }
    }
    function timeConverter(t) {
        //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    }
    function count() {
        time--
        $(".time-left").text(timeConverter(time))
    }
    function check(q,c){
        c = c.substring(3,c.length)
        if(c == q[q.correct]){
            return true
        }
        else{
            return false
        }
    }
    function noAnswer(){
        clearInterval(qTimer)
        console.log("no answer")
        var correctChoice = ".li-" + q.correct
        $(correctChoice).fadeToggle(400).fadeToggle(400).fadeToggle(400).fadeToggle(400).fadeToggle(400).fadeToggle(400).fadeToggle(400).fadeToggle(400)
        unanswered++
        var reload = setTimeout(load, 3200)
    }
    
    $(".start-btn").click(function(){
        $(".start-btn").hide()
        $(".result").hide()
        $(".game-content").show()  
        qList = [...questions]                   // create temp list of questions 
        load()                                   // call custom load() function to load html
        


    })

    $("li").click(function(){
        if(!choiceLock){
            choiceLock = true
            clearTimeout(timeUp)
            clearInterval(qTimer)
            var select = $(this).text()
            if(check(q,select)){
                $(this).css("color", "rgb(0, 174, 130)")
                console.log("correct")
                var correctChoice = ".li-" + q.correct
                $(correctChoice).fadeToggle(700).fadeToggle(900).fadeToggle(700).fadeToggle(900)
                correct++
            }
            else{
                $(this).css("color","rgb(255, 87, 112)")
                console.log("incorrect")
                var correctChoice = ".li-"+q.correct
                $(correctChoice).fadeToggle(400).fadeToggle(400).fadeToggle(400).fadeToggle(400).fadeToggle(400).fadeToggle(400).fadeToggle(400).fadeToggle(400)
                incorrect++
            }
            newQues = setTimeout(load, 3200)   
        }
    })

    $(".restart-btn").click(function () {
        console.log("restart worked")
        $(".start-btn").hide()
        $(".result").hide()
        $(".game-content").show()
        qList = [...questions]              // create temp list of questions 
        load()
    })
    




})