let minimum = 160;
let maximum = 167;
let range = maximum - minimum;
let smartRange = range*0.90;
console.log(smartRange, range);
let smartMin = minimum + range - smartRange;
console.log(smartMin, minimum);
let smartMax = maximum - range + smartRange;
console.log(smartMax, maximum);
// let randomNum = Math.floor(Math.random()*range) + minimum;
let randomNum = parseInt(Math.floor(Math.random()*range) + smartMin);
if (randomNum > minimum && randomNum < maximum) {
    console.log("Yay! This worked");
    console.log(randomNum);
} else if (randomNum < minimum) {
    console.log("too little...");
    console.log(randomNum);
} else if (randomNum > maximum) {
    console.log("That number is too high!");
    console.log(randomNum);
} else {
    console.log("Something broke...");
    console.log(randomNum);
};