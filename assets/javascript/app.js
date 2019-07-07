var q1 = {
    question: "Who won the 2019 Woman's World Cup Final?",
    a: "Netherlands",
    b: "USA",
    c: "France",
    d: "Argentina",
    correct: "b"
}

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

window.onload = function(){
    $(".game-content").hide()   //hide q&a html
    
    function load(q){
        $(".question").text(q.question)    // load questions & answers into html
        $(".choice-a").text(q.a)
        $(".choice-b").text(q.b)
        $(".choice-c").text(q.c)
        $(".choice-d").text(q.d)
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
        $(".game-content").show()   
        
        load(q1)
        $(".time-left").text(timeConverter(time))
        qTimer = setInterval(count, 1000)
    
    })

    $("li").click(function(){
        if(!choiceLock){
            choiceLock = true
            clearInterval(qTimer)
            var select = $(this).text()
            if(check(q1,select)){
                $(this).css("background", "rgb(0, 142, 106)").css("color", "rgb(0, 174, 130)")
                correct++
            }
            else{
                $(this).css("background", "rgb(255, 26, 75)").css("color","rgb(255, 87, 112)")
                var correctChoice = ".li-"+q1.correct
                console.log(correctChoice)
                $(correctChoice).fadeToggle(1000).fadeToggle(1000).fadeToggle(1000).fadeToggle(1000).fadeToggle(1000).fadeToggle(1000)
                incorrect++
            }
            
        }


    })
    




}