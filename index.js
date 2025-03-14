let buttonOrder = [];
let userOrder = [];
let allButtons = ["#green", "#red", "#blue", "#yellow"]; 
let buttonSounds = ["green", "red", "blue", "yellow"];
let isPlaying = false;

// Start game with a key press
$(document).keypress(function() {
    if (!isPlaying) {
        isPlaying = true;
        buttonOrder = [];
        userOrder = [];
        $("h1").text("Level 1");
        game();  // Start the game after key press
    }
});

// User presses a button and adds it to user's button order array
$(".btn").click(function (event) {
    if (isPlaying) {
        const buttonID = event.target.id;
        const buttonIndex = buttonSounds.indexOf(buttonID);
        const activeButton = $("." + buttonID);
        userOrder.push(buttonIndex);

        activeButton.addClass("pressed");
        console.log(userOrder);
        console.log(buttonOrder);
        setTimeout(function () {
            activeButton.removeClass("pressed");
        }, 100);

        compareButtonOrder();
    }
});

function compareButtonOrder() {
    const testOrder = JSON.stringify(userOrder) === JSON.stringify(buttonOrder.slice(0, userOrder.length));
    if (testOrder === true) {
        // If the user's sequence matches so far, check if it's complete
        if (userOrder.length === buttonOrder.length) {
            setTimeout(function () {
                userOrder = [];
                game(); // Proceed to the next level
            }, 1000);
        }
    } else {
        // If the user's sequence is incorrect, end the game
        $("body").css("background-color", "red");
        setTimeout(function () {
            $("body").css("background-color", "#011F3F");
        }, 200);

        isPlaying = false;
        $("h1").text("Game Over, Press Any Key to Restart");
    }
}

// Add new button to button order
function nextSequence() {
    const randomButton = Math.floor(Math.random() * allButtons.length);
    const buttonSound = new Audio(`sounds/${buttonSounds[randomButton]}.mp3`);
    buttonOrder.push(randomButton); 

    $(allButtons[randomButton]).fadeOut(100).fadeIn(100); 
    buttonSound.play(); 

    $("h1").text("Level " + buttonOrder.length)
}

function game(){
    if(isPlaying) {
        nextSequence();
    }
}