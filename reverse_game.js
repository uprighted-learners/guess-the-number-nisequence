// Imports readline and allows us to do input in and out
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

// Ask function that takes in text and returns and resolves a promise
function ask(questionText) {
    return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
    });
};

// * run file in terminal with: node fileName.js
// ! DO NOT TOUCH CODE ABOVE THIS LINE

// Async start function being invoked
start();

// The function that starts the whole game
async function start() {
  // Intro game text
    console.log("\n-------------------------");
    console.log("Welcome to number picker!");
    console.log("Let's play a game where I (computer) make up a number and you (human) try to guess it.")
    console.log("-------------------------");
    let minNum = 1;

    async function pickHighNum(minNum2) {
        // Asking the user for highest number
        let pickMaxNum = await ask(`\nPlease choose a number greater than ${minNum2} for the upper limit: `);
        
        // Grab the value of user input
        let highNum = parseInt(pickMaxNum);
        
        if (highNum != pickMaxNum) {
            // if user does not select something valid
            console.log("\n...\nNo fair! I don't know how to pick things like that!");
            
            // cycle back through to max # selection
            pickHighNum(minNum2);
            
        } else if (highNum <= minNum2) {
            // confirm number is greater than one
            console.log("\nThought you could pull one over on me, eh?");
            
            // cycle back through to max # selection
            pickHighNum(minNum2);
        
        } else {
            // Confirmation message print
            console.log(`\nYou set ${highNum} as the highest value possible.`);
            
            async function pickMysteryNum(minNum1, maximum) {
                console.log(`\nThe starting range is ${minNum1} to ${maximum}.`)
                let range = maximum - minNum1;
                let guess = Math.floor(Math.random()*range + 1);
                
                // ! DELETE THIS BEFORE FINAL PUSH
                console.log(guess, "-- Just for testing purposes!");
                // ! DELETE
                
                if (guess >= minNum1 && guess <= maximum) {
                    console.log("Selecting a random number within the range selected...");
                    let compNumGuess = guess;
                    console.log(compNumGuess, "-- Just for testing purposes, again!");
                    let attempts = 1;
                    async function letHumanGuess(compNumPick, tries) {
                        // ! DELETE THIS BEFORE FINAL PUSH
                        console.log(compNumPick, "-- Just for testing purposes!");
                        // ! DELETE
                        let humanGuess = await ask(`\nOK, I've got my number. What is your guess #${tries}?\n`);
                        let roundGuess = parseInt(humanGuess);
                        //let roundGuess = Math.round(findGuess);
                        console.log(`\nIt looks like you guessed ${roundGuess}.\nLet me see if that's right...\n`);
                        if (roundGuess > compNumPick) {
                            console.log("Sorry, no. Try a smaller number.");
                            tries = tries + 1;
                            letHumanGuess(compNumPick, tries);
                        } else if (roundGuess < compNumPick) {
                            console.log("Nice try! My number is higher than that.")
                            tries = tries + 1;
                            letHumanGuess(compNumPick, tries);
                        } else if (roundGuess == compNumPick) {
                            console.log("WOW! You got it! Great job.");
                            console.log(`You found my number in ${tries} guess(es)!`);
                            async function gameOver() {
                                let playAgain = await ask("\nI KNEW it! Thanks for playing. That was fun!\n\nDo you want to play again? Y or N?\n");
                                playAgain;
                                if (playAgain === "Y" || playAgain === "y") {
                                    console.log("\nFantastic! I'll see you in a bit!");
                                    start();
                                } else {
                                    console.log("Okay, no hard feelings. Have a great day! See you next time. :-)");
                                    process.exit(); //! EXITS
                                };
                            };
                            gameOver();
                        } else {
                            console.log("I don't know what that is, but it's not the right answer.");
                            tries = tries + 1;
                            letHumanGuess(compNumPick, tries);
                        }; // end of if else within letHumanGuess
                        letHumanGuess(compNumGuess, attempts);
                    }; // end of letHumanGuess
                } else {
                    console.log("*Blushes*");
                    console.log(`I almost picked ${guess} as my number. Whoops! Let me try something else.`);
                    pickMysteryNum(minNum1, maximum);
                };
                return guess;
            }; // end of pickMysteryNum
        }; // end of if else within pickHighNum
    };
    pickHighNum(minNum);
};