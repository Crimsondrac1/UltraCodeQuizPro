var questions = [{
    question: "What company developed Bootstrap?",
    choices: ["Microsoft", "Apple", "Twitter", "Facebook"],
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
    question: "What answer below would be the correct way to reference an element's ID in CSS",
    choices: ["-element", "#element", ".element", "$element"],
    correctAnswer: 1
}, {
    question: "How man columns does a standard Bootstrap grid row have?",
    choices: ["8", "9", "10", "12"],
    correctAnswer: 3
},{
	question: "Which of the following are not jQuery Mouse events?",
    choices: [".click()", ".cursor()", ".toggle()", "contextMenu()"],
    correctAnswer: 1
},{
	question: "What command would you use in Git to create a new branch?",
    choices: ["git branch -b branchname", "git checkout -b branchname", "", "57"],
    correctAnswer: 3
},{
	question: "8. Look at the following selector: $('div'). What does it select?",
    choices: ["The first div element", "The last div element", "All div elements", "Current div element"],
    correctAnswer: 2
},{
	question: "9. How can a value be appended to an array?",
    choices: ["arr(length).value;", "arr[arr.length]=value;", "arr[]=add(value);", "None of these"],
    correctAnswer: 1
},{
	question: "10. What will the code below output to the console? console.log(1 +  +'2' + '2');",
    choices: ["'32'", "'122'", "'13'", "'14'"],
    correctAnswer: 0
}];


var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
	var clock=10;
	var t;
$(document).ready(function () 
{
    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
    $(this).find(".preButton").attr('disabled', 'disabled');
	
	timedCount();
	
	$(this).find(".preButton").on("click", function () 
	{		
		
        if (!quizOver) 
		{
			if(currentQuestion == 0) { return false; }
	
			if(currentQuestion == 1) {
			  $(".preButton").attr('disabled', 'disabled');
			}
			
				currentQuestion--; // Since we have already displayed the first question on DOM ready
				if (currentQuestion < questions.length) 
				{
					displayCurrentQuestion();
					
				} 					
		} else {
			if(viewingAns == 3) { return false; }
			currentQuestion = 0; viewingAns = 3;
			viewResults();		
		}
    });

	
	// On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () 
	{
        if (!quizOver) 
		{
			
            var val = $("input[type='radio']:checked").val();

            if (val == undefined) 
			{
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } 
			else 
			{
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();
				if (val == questions[currentQuestion].correctAnswer) 
				{
					correctAnswers++;
				}
				iSelectedAnswer[currentQuestion] = val;
				
				currentQuestion++; // Since we have already displayed the first question on DOM ready
				if(currentQuestion >= 1) {
					  $('.preButton').prop("disabled", false);
				}
				if (currentQuestion < questions.length) 
				{
					displayCurrentQuestion();
					
				} 
				else 
				{
					displayScore();
					$('#iTimeShow').html('Quiz Time Completed!');
					$('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
					clock=185;
					$(document).find(".preButton").text("View Answer");
					$(document).find(".nextButton").text("Play Again?");
					quizOver = true;
					return false;
					
				}
			}
					
		}	
		else 
		{ // quiz is over and clicked the next button (which now displays 'Play Again?'
			quizOver = false; $('#iTimeShow').html('Time Remaining:'); iSelectedAnswer = [];
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
		if(clock == 185) 
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
					$('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
					clock=185;
					$(document).find(".preButton").text("View Answer");
					$(document).find(".nextButton").text("Play Again?");
					quizOver = true;
					return false;
					
		}
		
		
		clock = clock - 1;
		t = setTimeout(function()
		{
			timedCount()
		},1000);
	}
	
	
// This displays the current question AND the choices
function displayCurrentQuestion() 
{

	if(clock == 185) { clock = 180; timedCount(); }
    //console.log("In display current Question");
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;
	
	
    for (i = 0; i < numChoices; i++) 
	{
        choice = questions[currentQuestion].choices[i];
		
		if(iSelectedAnswer[currentQuestion] == i) {
			// $('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			//$('<li><input class="form-check-input" type="radio" checked="checked" name="quizChoice" id="quizChoice1" value=' + i + ' name="dynradio" /> <label class="form-check-label " for="quizChoice1"> ' +  '  ' + choice  + '</li>').appendTo(choiceList);
			$('<li class="w-50"><input class="form-check-input" type="radio" checked="checked" name="quizChoice" id="quizChoice1" value=' + i + ' /> <label class="form-check-label" for="quizChoice1"> ' +  '  ' + choice  + '</label></li>').appendTo(choiceList);
		} else {
			// $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
            $('<li class="w-50"><input class="form-check-input" type="radio" name="quizChoice" id="quizChoice1" value=' + i + ' /> <label class="form-check-label" for="quizChoice1"> ' +  '  ' + choice  + '</label></li>').appendTo(choiceList);
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
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
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
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;
	
	
	for (i = 0; i < numChoices; i++) 
	{
        choice = questions[currentQuestion].choices[i];
		
		if(iSelectedAnswer[currentQuestion] == i) {
			if(questions[currentQuestion].correctAnswer == i) {
				// $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
				$('<li style="border:2px solid green;margin-top:10px;"><input class="form-check-input w-50" type="radio" checked="checked" name="quizChoice" id="quizChoice1" value=' + i + ' /> <label class="form-check-label m-5 p-5" for="quizChoice1"> ' +  '  ' + choice  + '</label></li>').appendTo(choiceList);
			} else {
				// $('<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
				$('<li style="border:2px solid red;margin-top:10px;"><input class="form-check-input w-50" type="radio" checked="checked" name="quizChoice" id="quizChoice1" value=' + i + ' /> <label class="form-check-label m-5 p-5" for="quizChoice1"> ' +  '  ' + choice  + '</label></li>').appendTo(choiceList);
			}
		} else {
			if(questions[currentQuestion].correctAnswer == i) {
				// $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
				$('<li style="border:2px solid green;margin-top:10px;"><input class="form-check-input" type="radio" name="quizChoice" id="quizChoice1" value=' + i + ' /> <label class="form-check-label" for="quizChoice1"> ' +  '  ' + choice  + '</label></li>').appendTo(choiceList);
			} else {
				// $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
				$('<li><input class="form-check-input" type="radio" name="quizChoice" id="quizChoice1" value=' + i + ' /> <label class="form-check-label" for="quizChoice1"> ' +  '  ' + choice  + '</label></li>').appendTo(choiceList);
			}
		}
    }
	
	currentQuestion++;
	
	setTimeout(function()
		{
			viewResults();
		},3000);
}
