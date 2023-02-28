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
            // confirm number is greater than or equal to min
            console.log("\nThought you could pull one over on me, eh?");
            
            // cycle back through to max # selection
            pickHighNum(minNum2);
        
        } else {
            // Confirmation message print
            console.log(`\nYou set ${highNum} as the highest value possible.`);
            
            async function pickMysteryNum(minNum1, maximum) {
                // confirms both min and max set, calc range, and pick a #
                console.log(`\nThe starting range is ${minNum1} to ${maximum}.`)
                let range = maximum - minNum1;
                let guess = Math.floor(Math.random()*range + 1);
                
                if (guess >= minNum1 && guess <= maximum) {
                    // for valid random numbers, aka "guess" variable
                    console.log("Selecting a random number within the range chosen...");
                    let compNumGuess = guess;
                    let attempts = 1;
                    console.log("\nOK, I've got my number.");
                    async function letHumanGuess(compNumPick, tries) {
                        let humanGuess = await ask(`What is your guess #${tries}?\n`);
                        // tracking how many attempts human has made
                        let roundGuess = parseInt(humanGuess);
                        // the above not only converts string to a number but to an integer! :-)
                        // restates configured answer to user below
                        console.log(`\nIt looks like you guessed ${roundGuess}.\nLet me see if that's right...\n`);
                        if (roundGuess > compNumPick) {
                            // too high
                            console.log("Sorry, no. Try a smaller number.");
                            tries = tries + 1;
                            letHumanGuess(compNumPick, tries);
                        } else if (roundGuess < compNumPick) {
                            // too low
                            console.log("Nice try! My number is higher than that.")
                            tries = tries + 1;
                            letHumanGuess(compNumPick, tries);
                        } else if (roundGuess == compNumPick) {
                            // if equal to, JavaScript will need to access gameOver function
                            async function gameOver() {
                                console.log("WOW! You got it! Great job.");
                                console.log(`You found my number in ${tries} guess(es)!`);
                                // lists score
                                let playAgain = await ask("Thanks for playing. That was fun!\n\nDo you want to play again? Y or N?\n");
                                playAgain;
                                if (playAgain === "Y" || playAgain === "y") {
                                    console.log("\nFantastic! I'll see you in a bit!");
                                    start();
                                } else {
                                    // if user responds with anything other than Y or y, exit
                                    console.log("Okay, no hard feelings. Have a great day! See you next time. :-)");
                                    process.exit(); //! EXITS
                                };
                            };
                            gameOver();
                            // calls gameOver function
                        } else {
                            // If NaN or Undefined
                            console.log("I don't know what that is, but it's not the right answer.");
                            tries = tries + 1;
                            letHumanGuess(compNumPick, tries);
                        }; // end of if else within letHumanGuess
                    }; // end of letHumanGuess
                    letHumanGuess(compNumGuess, attempts);
                } else {
                    // for non-valid guess numbers, on the off-chance they happen
                    console.log("*Blushes*");
                    console.log(`I almost picked ${guess} as my number. Whoops! Let me try something else.`);
                }; // end of if else within pickMysteryNum
                return guess;
            }; // end of pickMysteryNum
            // asks computer to pick num with current min and max in mind
            pickMysteryNum(minNum2, highNum);
        }; // end of if else within pickHighNum
    };
    // asks user to pick maximum
    pickHighNum(minNum);
};