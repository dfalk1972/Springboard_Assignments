/* Task 1: Declare a Destination Variable */
// TODO: Use `let` to declare a variable named `destination` and assign it the value `"Ancient Egypt"`. Print the destination to the console.
let destination = "Ancient Egypt";
console.log(destination);

/* Task 2: Change the Destination */
// TODO: Now, change the `destination` variable to `"Medieval Europe"`. Print the new destination to the console.
destination = "Medieval Europe";
console.log(destination);

/* Task 3: Declare a Constant Travel Date */
// TODO: Use `const` to declare a variable named `travelDate` and set it to `"2024-03-15"`. Try to change the `travelDate` to another value and observe and explain what happens as a comment.
const travelDate = "2024-03-15";
console.log(travelDate);

travelDate = "202-03-15";

//cannot re-assign a constant variable Error from console : hoisting.js:13 Uncaught TypeError: Assignment to constant variable.
//(anonymous)	@	hoisting.js:13

/* Task 4: Experiment with Variable Hoisting */
// TODO: Before declaring any variable, try to print a variable named `timeMachineModel` to the console. Then, declare `timeMachineModel` using `var` and assign it the value `"T-800"`. Observe and explain what happens as a comment.
console.log(timeMachineModel);
//error from console: hoisting.js:19 Uncaught ReferenceError: timeMachineModel is not defined

var timeMachineModel = "T-800";

// when I run the code as above I get undefined. It hoisted it to the top, and recognized that the variable has been declared but it returns undefined because it does not get defined until after console.log(timeMachineModel);
