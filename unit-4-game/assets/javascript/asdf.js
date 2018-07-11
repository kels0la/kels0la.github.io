$(document).ready(function () {
    const state = {
        targetNum: 0,
        currentScore: 0,
        wins: 0,
        losses: 0,
    }

    resetClickEvents('.gem', makeHandler, state);

    newGame(state);

    function makeHandler(stateObj) { // closures are neat
        const value = randomInt(1, 12);
        function clickHandler() {
            stateObj.currentScore += value;
            if (stateObj.currentScore > stateObj.targetNum) {
                console.log("you lose");
                stateObj.losses++;
                newGame(stateObj);
            } else if (stateObj.currentScore === stateObj.targetNum) {
                console.log("YOU WIN");
                stateObj.wins++;
                newGame(stateObj);
            }
            updateDisplays(stateObj);
        }
        return clickHandler;
    }

    function newGame(stateObj) {
        stateObj.targetNum = randomInt(19, 120);
        stateObj.currentScore = 0;
        resetClickEvents('.gem', makeHandler, stateObj);
        updateDisplays(stateObj);
    }

    function resetClickEvents(selector, func, ...arg) {
        for (let el of $(selector)) {
            $(el).off('click'); // remove all click event listeners
            $(el).on('click', func(...arg))
        }
    }

    function updateDisplays(stateObj) {
        $('#target-display').text(`Target number: ${stateObj.targetNum}`);
        $('#wins-display').text(`Wins: ${stateObj.wins}, Losses: ${stateObj.losses}`);
        $('#current-total-display').text(`Your current score is: ${stateObj.currentScore}`)
    }
})

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}