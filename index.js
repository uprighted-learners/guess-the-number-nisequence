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
  let minNum = 1;
  let mysteryNum;
  // console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  // let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  // console.log('You entered: ' + secretNumber);

  // Now try and complete the program.
  // Example async await function to ask for highest number (max)
  async function pickHighNum() {
    // Asking the user for highest number
    let pickMaxNum = await ask(`\nPlease choose a number greater than ${minNum}: `);

    // Grab the value of user input
    let highNum = parseInt(pickMaxNum);

    // Confirmation message print
    console.log(`\nYou set ${highNum} as the highest value possible.`);

    learnMysteryNum();

    async function learnMysteryNum() {
      // ask human to pick mystery num
      let pickMysteryNum = await ask(`\nPlease choose a number between ${minNum} and ${highNum}.\nDon't worry, I'll keep my eyes closed!\n`);
  
      pickMysteryNum;
    
      let mysteryNum = parseInt(pickMysteryNum);
    
      console.log(`\nYou entered: ${mysteryNum}`);
  
      guessNum();
      
      async function guessNum() {
        let numMath = parseInt(minNum + (Math.random() * highNum));
  
        let pivotNum = await ask(`\nIs your secret number: ${numMath}? Y or N?\n`);
        if (pivotNum === "Y" || pivotNum === "y") {
          console.log("Processing...");
          if (mysteryNum === numMath) {
            let playAgain = await ask("\nI KNEW it! Thanks for playing. That was fun!\nDo you want to play again? Y or N?\n");
            if (playAgain === "Y" || playAgain === "y") {
              console.log("Fantastic! I'll see you in a bit!");
              start();
            } else {
              console.log("Okay, no hard feelings. Have a great day! See you next time. :-)");
            }
          } else {
            console.log("Wait, that seemed too easy. Are you sure that was right?");
            pivotNum;
          };
        } else if (pivotNum === "N" || pivotNum === "n") {
          console.log("Processing your response...");
          if (mysteryNum === numMath) {
            console.log("Hey, no fair! Let's be honest here.");
            pivotNum;
          } else {
            console.log("Hmm, I see...");
            highLow();
          };
        } else {
          console.log("Sorry, I can't understand your response.");
          pivotNum;
        };
        highLow();
      };

      async function highLow() {
        let flipCoin = await ask(`\nIs your secret number higher or lower than ${numMath}? H or L?\n`);
        if (flipCoin === "H" || flipCoin === "h") {
          console.log("Processing...");
          if (mysteryNum > numMath) {
            console.log("That's good to know!");
            minNum = numMath;
            guessNum();
          } else {
            console.log("Wait, something's off. Are you sure that was right?");
            highLow();
          };
        } else if (flipCoin === "L" || flipCoin === "l") {
          console.log("Processing your response...");
          if (mysteryNum < numMath) {
            console.log("Thanks for the info!");
            highNum = numMath;
            guessNum();
          } else {
            console.log("Be honest, now...");
            highLow();
          };
        } else {
          console.log("Sorry, I can't understand your response.");
          highLow();
        };
      
      };
      
    };


  };

  

  

  // Calling the pick high number function
  pickHighNum();

};
// Stops the start function from running, "exits"
 // ! process.exit();
