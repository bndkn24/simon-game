var buttonColours = ["red", "blue", "yellow", "green"];
var userClickedPattern = [];
var firstTimeBoo = false;
var gamePattern = [];
var level = 1;

$(document).keypress(function () {
  if (!firstTimeBoo) {
    nextSequence();
    firstTimeBoo = true;
  }
});

function nextSequence() {
  document.querySelector("h1").innerHTML = "Level " + level++;
  var randomChoosenColour = buttonColours[Math.floor(Math.random() * 3) + 1];
  gamePattern.push(randomChoosenColour);
  animatePress(randomChoosenColour);
  playSound(randomChoosenColour);
  userClickedPattern = [];
}

$(".btn").click(function () {
  userClickedPattern.push(this.id);
  animatePress(this.id);
  if (checkAnswer(userClickedPattern.length - 1)) playSound(this.id);
});

function checkAnswer(index) {
  if (userClickedPattern[index] == gamePattern[index]) {
    if (index == gamePattern.length - 1) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    return true;
  } else {
    $("body").addClass("game-over");
    $("h1").html("Game Over, Press Any Key to Restart");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    startOver();
    return false;
  }
}

function startOver() {
  level = 1;
  gamePattern = [];
  firstTimeBoo = false;
}

function animatePress(color) {
  document.getElementById(color).classList.add("pressed");
  setTimeout(function () {
    document.getElementById(color).classList.remove("pressed");
  }, 100);
}

function playSound(name) {
  switch (name) {
    case "red":
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;
    case "blue":
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;
    case "green":
      var audio = new Audio("sounds/green.mp3");
      audio.play();
      break;
    default:
      console.log("Invalid color");
  }
}
