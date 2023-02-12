// Imports readline and allows us to do input in and out
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

// Ask function that takes in text and returns and resolves a promise
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// * run file in terminal with: node fileName.js
// ! DO NOT TOUCH CODE ABOVE THIS LINE

// Async start function being invoked
start();

// The function that starts the whole game
async function start() {
  // Intro game text
  console.log("\n-------------------------");
  console.log("Welcome to number picker!");
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  console.log("-------------------------");
  // console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  // let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  // console.log('You entered: ' + secretNumber);
  // Now try and complete the program.
  // Example async await function to ask for highest number (max)
  async function pickHighNum() {
    // Set lowest num
    let minNum = 1;

    // Asking the user for highest number
    let pickMaxNum = await ask(`\nPlease choose a number greater than ${minNum}: `);

    // Grab the value of user input
    let highNum = parseInt(pickMaxNum);

    // Confirmation message print
    console.log(`\nYou set ${highNum} as the highest value possible.`);

  }

  // Calling the pick high number function
  pickHighNum();


}
// Stops the start function from running, "exits"
 // ! process.exit();
