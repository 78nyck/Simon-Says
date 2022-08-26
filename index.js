let gamePattern = [];
let userClickedPattern = [];
let currentRandomColor;
let level = 0;

function animateFailState() {
    $("h1").text("Game Over, Press A to Restart");
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
}

function animateUserClick(sound) {
    let curButton = $("#" + sound);
    curButton.addClass("pressed");
    setTimeout(function() {
        curButton.removeClass("pressed");
    }, 100);
}

function animateCurrentColor() {
    $("#" + currentRandomColor).fadeOut(100).fadeIn(100);
    playSound(currentRandomColor);
}

function nextSequence() {
    level++;

    $("h1").text("Level " + level);

    let colors = ["red", "yellow", "blue", "green"];
    let curColor = colors[Math.floor(Math.random() * colors.length)];
    currentRandomColor = curColor;
    gamePattern.push(curColor);

    console.log(gamePattern);

    animateCurrentColor();
}

function restartGame() {
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    $(".btn").off("click");
}

function playSound(name) {
    let curColorAudio = new Audio("sounds/" + name + ".mp3");
    curColorAudio.play();
}

$("body").on("keydown", function(event) {
    if ((event.key === "a" || event.key === "A") && (level === 0)) {

        $(".btn").on("click", function() {
            let userClickedColor = $(this).attr("id");
            userClickedPattern.push(userClickedColor);

            let curIndex = userClickedPattern.length - 1;

            if (userClickedColor === gamePattern[curIndex]) {
                animateUserClick(userClickedColor);
                playSound(userClickedColor);

                if (userClickedPattern.length === gamePattern.length) {
                    userClickedPattern = [];
                    setTimeout(nextSequence, 1000);
                }
            } else {
                animateUserClick(userClickedColor);
                animateFailState();
                restartGame();
            }
        });

        nextSequence();
    }
});





