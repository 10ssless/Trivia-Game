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

var questions = [q1,q2,q3,q4]

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
var newQues;
var q;
var qList;

window.onload = function(){
    $(".game-content").hide()   //hide q&a html
    $(".result").hide()
    

    function load(){
        if(qList.length > 0){
            console.log("load correctly")
            // q = qList[Math.floor(Math.random() * qList.length)]   
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
            console.log("load wrong")
            $(".game-content").hide()
            $(".result").show()
            $(".question").text("Results")
            $(".correct").text(correct)
            $(".incorrect").text(incorrect)
            $(".unanswered").text(unanswered)
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
    
    $(".start-btn").click(function(){
        $(".start-btn").hide()
        $(".result").hide()
        $(".game-content").show()  
        qList = questions                   // create temp list of questions 
        console.log(qList.length)
        load()
        // newQues = setTimeout(load, 15000)


    })

    $("li").click(function(){
        if(!choiceLock){
            choiceLock = true
            clearInterval(qTimer)
            var select = $(this).text()
            if(check(q,select)){
                $(this).css("color", "rgb(0, 174, 130)")
                console.log("correct")
                var correctChoice = ".li-" + q.correct
                $(correctChoice).fadeToggle(750).fadeToggle(900).fadeToggle(750).fadeToggle(1000)
                correct++
            }
            else{
                $(this).css("color","rgb(255, 87, 112)")
                console.log("incorrect")
                var correctChoice = ".li-"+q.correct
                $(correctChoice).fadeToggle(400).fadeToggle(400).fadeToggle(400).fadeToggle(400).fadeToggle(400).fadeToggle(400).fadeToggle(400).fadeToggle(400)
                incorrect++
            }
            newQues = setTimeout(load, 4100)   
        }
    })

    $(".restart-btn").click(function () {
        console.log("restart worked")
        $(".start-btn").hide()
        $(".result").hide()
        $(".game-content").show()
        qList = questions                   // create temp list of questions 
        console.log(qList.length)
        load()
    })
    




}