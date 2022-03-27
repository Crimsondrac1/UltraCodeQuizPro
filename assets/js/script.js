<<<<<<< Updated upstream
var quizArray = [{
    question: "What company developed Bootstrap?",
    choices: ["Microsoft", "Apple", "Twitter", "Facebook", "Jamba Juice"],
    correctAnswer: 2
}, {
    question: "What does DOM stand for?",
    choices: ["Data Oriented Math", "Document Object Model", "Domain Object Mapping", "Duplicate Opposed Modifiers"],
    correctAnswer: 1
}, {
    question: "Which of the folling is NOT a web API?",
    choices: ["JavaScript", "jQueryUI", "Moment.js", "Bootstrap"],
    correctAnswer: 0
}, {
    question: "What answer below would be the correct way to reference an element's ID in CSS?",
    choices: ["-element", "#element", ".element", "$element"],
    correctAnswer: 1
}, {
    question: "How man columns does a standard Bootstrap grid row have?",
    choices: ["8", "9", "10", "12"],
    correctAnswer: 3
},{
	question: "Which of the following is NOT a jQuery Mouse event?",
    choices: [".click()", ".cursor()", ".toggle()", "contextMenu()"],
    correctAnswer: 1
},{
	question: "What command would you use in Git to create a new branch?",
    choices: ["git branch -b branchname", "git checkout -b branchname", "git branch -d branchname", "git checkout branchname"],
    correctAnswer: 1
},{
	question: "What is the name of the HTML file browsers attempt to load first when a new website is opened?",
    choices: ["home.html", "active.html", "default.html", "index.html"],
    correctAnswer: 3
},{
	question: "What special character is used to start a jQuery line?",
    choices: ["#", "%", "$", "&"],
    correctAnswer: 2
},{
	question: "What HTML attribute is used to add in Bootstrap settings?",
    choices: ["class", "id", "style", "src"],
    correctAnswer: 0
}];


var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var clock=60;
var timeout;

$(document).ready(function () 
{
    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
    // $(this).find(".preButton").attr('disabled', 'disabled');
	
	timedCount();
	
	$(this).find(".choices").on("click", function () 
	{		
		
        if (!quizOver) 
		{
			if(currentQuestion < 1) { 
				return false; 
			}
	
			if(currentQuestion > 0) {
			//   $(".preButton").attr('disabled', 'disabled');
			}
			
				currentQuestion--; // Since we have already displayed the first question on DOM ready
				if (currentQuestion < quizArray.length) 
				{
					displayCurrentQuestion();
				} 					
		}
		 else {
			if(viewingAns == 3) { return false; }
			currentQuestion = 0;
            viewingAns = 3;
			viewResults();		
		}
    });

	
	// Selecting an answer should display the next question
    $(this).find(".choices").on("click", function () 
	{
        if (!quizOver) 
		 { currentQuestion++; }
			
        //     var val = $(".choices").val();
		// 	console.log(val)

        //     // if (val == undefined) 
		// 	// {
        //     //     $(document).find(".quizMessage").text("Please select an answer");
        //     //     $(document).find(".quizMessage").show();
        //     // } 
		// 	// else 
		// 	// {
        //         // TODO: Remove any message -> not sure if this is efficient to call this each time....
        //         // $(document).find(".quizMessage").hide();
		// 		if (val == quizArray[currentQuestion].correctAnswer) 
		// 		{
		// 			correctAnswers++;
		// 		}
		// 		// iSelectedAnswer[currentQuestion] = val;
				
		// 		currentQuestion++; // Since we have already displayed the first question on DOM ready
		// 		// if(currentQuestion >= 1) {
		// 		// 	//   $('.preButton').prop("disabled", false);
		// 		// }
		// 		if (currentQuestion < quizArray.length) 
		// 		{
		// 			displayCurrentQuestion();
					
					
		// 		} 
				// else 
				// {
				// 	displayScore();
				// 	$('#iTimeShow').html('Quiz Time Completed!');
				// 	$('#timer').html("You scored: " + correctAnswers + " out of: " + quizArray.length);
				// 	clock=60;
				// 	$(document).find(".preButton").text("View Answer");
				// 	$(document).find(".nextButton").text("Play Again?");
				// 	quizOver = true;
				// 	return false;
					
				// }
			// }
					
		// }	
		else 
		{ // quiz is over and clicked the next button (which now displays 'Play Again?'
			quizOver = false; 
			$('#iTimeShow').html('Time Remaining:'); 
			iSelectedAnswer = [];
			$(document).find(".nextButton").text("Next Question");
			$(document).find(".preButton").text("Previous Question");
			$(".preButton").attr('disabled', 'disabled');
			resetQuiz();
			viewingAns = 1;
			displayCurrentQuestion();
			hideScore();
		}
    });
});



function timedCount()
	{
		if(clock == 65) 
		{ 
			return false; 
		}
		
		var hours = parseInt( clock / 3600 ) % 24;
		var minutes = parseInt( clock / 60 ) % 60;
		var seconds = clock % 60;
		var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);            
		$('#timer').html(result);
		
		if(clock == 0 )
		{
					displayScore();
					$('#iTimeShow').html('You ran out of time! <br />');
					$('#timer').html("You scored: " + correctAnswers + " out of: " + quizArray.length);
					clock=0;
					$(document).find(".preButton").show();
					$(document).find(".nextButton").show();
					$(document).find(".preButton").text("View Answers");
					$(document).find(".nextButton").text("Play Again?");
					quizOver = true;
					return false;
					
		}
		
		
		clock = clock - 1;
		timeout = setTimeout(function()
		{
			timedCount()
		},1000);
	}
	
	
// This displays the current question AND the choices
function displayCurrentQuestion() 
{

	if(clock == 60) { clock = 60; timedCount(); }
    //console.log("In display current Question");
    var question = quizArray[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = quizArray[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;
	
	
    for (i = 0; i < numChoices; i++) 
	{
        choice = quizArray[currentQuestion].choices[i];
		
		if(iSelectedAnswer[currentQuestion] == i) {
			// $('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			//$('<li><input class="form-check-input" type="radio" checked="checked" name="quizChoice" id="quizChoice1" value=' + i + ' name="dynradio" /> <label class="form-check-label " for="quizChoice1"> ' +  '  ' + choice  + '</li>').appendTo(choiceList);
			$('<li class="choices w-75" value=' + i + '>' + choice  + '</li>').appendTo(choiceList);
			$(document).find(".preButton").hide();
			$(document).find(".nextButton").hide();

			// $('<li>').change(function() {
			// 	var selectedAnswer = $("<li> option:selected").text();
			// 	console.log(selectedAnswer);
			// });

			$(document).ready(function(){
				$("li").click(function(){
		   		Question++;
					console.log($(this).text());
				console.log(i)
				

				});
			});

		} else {
			// $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
            $('<li class="choices w-75" value=' + i + '>' + choice  + '</label></li>').appendTo(choiceList);
			$(document).find(".preButton").hide();
			$(document).find(".nextButton").hide();
			// $('<li>').change(function() {
			// 	var selectedAnswer = $("<li> option:selected").text();
			// 	console.log(selectedAnswer);
			// });
			$(document).ready(function(){
				$("li").click(function(){
		   		console.log($(this).text());
				   console.log(i)
				   
				});
			});
		}
    }
}

function resetQuiz()
{
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore()
{
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + quizArray.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() 
{
    $(document).find(".result").hide();
}

// This displays the current question AND the choices
function viewResults() 
{

	if(currentQuestion == 10) { currentQuestion = 0;return false; }
	if(viewingAns == 1) { return false; }

	hideScore();
    var question = quizArray[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = quizArray[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;
	
	
	for (i = 0; i < numChoices; i++) 
	{
        choice = quizArray[currentQuestion].choices[i];
		
		if(iSelectedAnswer[currentQuestion] == i) {
			if(quizArray[currentQuestion].correctAnswer == i) {
				// $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
				$('<li style="border:2px solid green;margin-top:10px;"><input class="form-check-input w-50 radio-inline" type="radio" checked="checked" name="quizChoice" id="quizChoice1" value=' + i + ' /> <label class="form-check-label m-5 p-5" for="quizChoice1"> ' +  '  ' + choice  + '</label></li>').appendTo(choiceList);
			} else {
				// $('<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
				$('<li style="border:2px solid red;margin-top:10px;"><input class="form-check-input w-50 radio-inline" type="radio" checked="checked" name="quizChoice" id="quizChoice1" value=' + i + ' /> <label class="form-check-label m-5 p-5" for="quizChoice1"> ' +  '  ' + choice  + '</label></li>').appendTo(choiceList);
			}
		} else {
			if(quizArray[currentQuestion].correctAnswer == i) {
				// $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
				$('<li style="border:2px solid green;margin-top:10px;"><input class="form-check-input radio-inline" type="radio" name="quizChoice" id="quizChoice1" value=' + i + ' /> <label class="form-check-label" for="quizChoice1"> ' +  '  ' + choice  + '</label></li>').appendTo(choiceList);
			} else {
				// $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
				$('<li><input class="form-check-input radio-inline" type="radio" name="quizChoice" id="quizChoice1" value=' + i + ' /> <label class="form-check-label" for="quizChoice1"> ' +  '  ' + choice  + '</label></li>').appendTo(choiceList);
			}
		}
    }
	
	currentQuestion++;
	
	setTimeout(function()
		{
			viewResults();
		},3000);
}
=======
// creating an array and passing the number, questions, options, and answers
let questions = [
    {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ]
  },
    {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ]
  },
    {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor"
    ]
  },
    {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ]
  },
    {
    numb: 5,
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language"
    ]
  },
  // you can uncomment the below codes and make duplicate as more as you want to add question
  // but remember you need to give the numb value serialize like 1,2,3,5,6,7,8,9.....

  //   {
  //   numb: 6,
  //   question: "Your Question is Here",
  //   answer: "Correct answer of the question is here",
  //   options: [
  //     "Option 1",
  //     "option 2",
  //     "option 3",
  //     "option 4"
  //   ]
  // },
];

//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
start_btn.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}
>>>>>>> Stashed changes
