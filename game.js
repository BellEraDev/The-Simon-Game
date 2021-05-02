let gamePattern = []
let userClickedPattern = []
const buttonColours = ["red", "blue", "green", "yellow"]
let level = 0
let started = false

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b)

$("body").keypress(function () {
  if (!started) {
    $("#level-title").text(`Level ${level}`)
    nextSequence()
    started = true
   }
})

 $(".btn").click(function () {
   const userChosenColour = $(this).attr("id")
   userClickedPattern.push(userChosenColour)
   
    playSound(userChosenColour)
    animatePress(userChosenColour)

    const index_of_the_last_answer = userClickedPattern.length - 1
    checkAnswer(index_of_the_last_answer)
  })
 
const nextSequence = () => {
  userClickedPattern = []
  level += 1
   $("#level-title").text(`Level ${level}`)
 let randomNumber = Math.round(Math.random() * 3)
  let randomChosenColour = buttonColours[randomNumber]
 gamePattern.push(randomChosenColour)
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)
}

function playSound(name) {
 switch (name) {
  case "red":
   const red = new Audio("./sounds/red.mp3")
   red.play()
   break;
  
  case "blue":
   const blue = new Audio("./sounds/blue.mp3")
   blue.play()
   break;
  
  case "green":
   const green = new Audio("./sounds/green.mp3")
   green.play()
   break;

   case "yellow":
   const yellow = new Audio("./sounds/yellow.mp3")
   yellow.play()
   break;
  
  default:
   const wrong = new Audio("./sounds/wrong.mp3")
   wrong.play()
 }
}

function animatePress(currentColour) {
 const activeButton = $("#" + currentColour)
  activeButton.addClass("pressed")
 setTimeout(function () {
  activeButton.removeClass("pressed")
 }, 100)
}  

function checkAnswer(currentLevel) {
  const checkValue = gamePattern[currentLevel] === userClickedPattern[currentLevel]
  if (checkValue) {
    const lastRandom = gamePattern.length - 1
    if (lastRandom === currentLevel) {
      setTimeout(function () {
        nextSequence()
      }, 1000)
    }
  } else {
    playSound("wrong")
    const flashEffect = $("body")
    flashEffect.addClass("game-over")
    $("#level-title").text('Game Over, Press Any Key to Restart')
    setTimeout(function () {
     flashEffect.removeClass("game-over")
    }, 200)
    startOver()
  }
 }

const startOver = () => {
  level = 0
  gamePattern = []
  started = false
 }
