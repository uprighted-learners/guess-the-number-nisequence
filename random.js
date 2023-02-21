/* 
    Test File for smartGuess Function
    - Runs in Output, not Terminal
    - Lists non-valid pre-guesses for testing purposes
    - Also lists other thought processes
*/
function smartGuess(minimum, maximum) {
    console.log("\nInput min & max:", minimum, maximum);
    let range = maximum - minimum;
    function multiplierCalc(rangeNum) {
        if (rangeNum <= 5) {
            let multiplier = 0.99;
            console.log("We seem to be very close!");
            return multiplier;
        } else if (rangeNum > 5 && rangeNum <= 12) {
            let multiplier = 0.85;
            console.log("Getting closer...");
            return multiplier;
        } else if (rangeNum > 12 && rangeNum <= 74) {
            let multiplier = 0.65;
            console.log("This is a reasonable range, but let's narrow this down.");
            return multiplier;
        } else {
            let multiplier = 0.55;
            console.log("We are still aways away....")
            return multiplier;
        };
    };
    let multiply = multiplierCalc(range);
    let smartRange = range*multiply;
    console.log("This is the smartRange compared to the regular range:", smartRange, range);
    let smartMin = minimum + range - smartRange;
    console.log("This is the smartMin compared to the regular min:", smartMin, minimum);
    let smartMax = maximum - range + smartRange;
    console.log("This is the smartMax compared to the regular max:", smartMax, maximum);
    let random = Math.random();
    console.log(random);
    let randomNum = Math.ceil((random*smartRange) + minimum);
    while (randomNum > Math.ceil(smartMax) || randomNum < Math.floor(smartMin)) {
        // ! want to make sure guess is valid and reasonable
        randomNum = Math.floor((Math.random()*smartRange) + smartMin);
        console.log(randomNum);
    };
    let numGuess = randomNum;
    return numGuess;
};

console.log("Guess 1:", smartGuess(100, 167));
console.log("Guess 2:", smartGuess(1, 26));
console.log("Guess 3:", smartGuess(5, 7));
console.log("Guess 4:", smartGuess(95, 99));
console.log("Guess 5:", smartGuess(1, 200));
console.log("Guess 6:", smartGuess(99, 102));
console.log("Guess 7:", smartGuess(789, 800));
console.log("Guess 8:", smartGuess(4444, 4445));
console.log("Guess 9:", smartGuess(191, 200));
console.log("Guess 10:", smartGuess(191, 200));