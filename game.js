var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

// key press to start
$(document).keypress(function(event){
  if(!start){
    nextSequence();
    start = true;
  }
  console.log("game pattern: [" + gamePattern + "]");
})

// Click listener
$(".btn").click(function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1); // check for every user pressed

  console.log("user clicked pattern: ["+userClickedPattern + "]");
})

// check user pattern and game pattern; currentlevel is the last item in user pattern
function checkAnswer(currentLevel){

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){ // check the last item 
    console.log("success");

    if (userClickedPattern.length === gamePattern.length){ // until user finish this cycle, go on next sequence
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }

  }
  else{
    console.log("wrong");
    // console.log("fianl gamePattern = [" + gamePattern + "]");
    // console.log("final user clicked pattern: ["+userClickedPattern + "]");

    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    startOver();

  }
}

function nextSequence(){
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
  level ++;
  $("#level-title").text("Level " + level);

}

// start Over
function startOver(){
  start = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

// flash animation
function animatePress(colour){
  $("#"+colour).fadeOut(100).fadeIn(100);
  $("#"+colour).addClass("pressed");

  setTimeout(function(){
    $("#"+colour).removeClass("pressed");
  }, 100);
}

// play audio
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
