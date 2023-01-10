
const gamePattern = [];
const userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];

let gameStart = false;
let level = 0;


// Start game by pressing key

$(document).keypress(function() {

if (!gameStart) {
    $("h1").text(`Level ${level}`);
    nextSequence();
    gameStart = true;
}


})

// Player click listener

$(".btn").click(function() {

    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour)
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

// Check Answer

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success');
        if (userClickedPattern.length === gamePattern.length) {
            
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }

    } else {
        console.log('wrong');
        let wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


// Sequence pattern

function nextSequence() {

    userClickedPattern.length = 0;

    let randomNumber = Math.floor(Math.random() * 3) + 1;
    let randomChosenColour  = buttonColours[randomNumber];

    animatePress(randomChosenColour)
    playSound(randomChosenColour);

    gamePattern.push(randomChosenColour);

    level++;
    $("h1").text(`Level ${level}`);

}

// Play sound

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Play animation

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed")
    setTimeout(() => {
        $("." + currentColour).removeClass("pressed")
    }, 100);
}

// Restart Game

function startOver() {
    level = 0;
    gamePattern.length = 0;
    gameStart = false;
}