/* Task 1: Compile Participant Details with Shorthand Property pNames */
// TODO: Construct an object named `participant` with properties for `name`, `age`, and `studyField`. Utilize shorthand property pNames to simplify your code.
const pName = "Dorsey";
const pAge = 53;
const pStudyField = "Javascript";

const participant = { pName, pAge, pStudyField };
console.log(participant);

/* Task 2: Implement a Shorthand Function for Participant Info */
// TODO: Copy the `participant` object by adding a shorthand method named `displayInfo` that prints the participant's details using `this` and a template string.

// const participantChange = {
//   pName,
//   pAge,
//   pStudyField,

//   // Shorthand method syntax
//   displayInfo() {
//     console.log(
//       `Name: ${this.pName}, pAge: ${this.pAge}, Field: ${this.pStudyField}`
//     );
//   },
// };
// participantChange.displayInfo();

/* Task 3: Implement a Same Shorthand Arrow Function for Participant Info */
// TODO: Echo the above task with an arrow function. Observe the behavior of `this` and explain your findings.
/*
 * Observations:
 * TODO: Explain here.
 * pName: undefined, pAge: undefined, pStudyField: undefined
 * Arrow functions do not work with this.
 */
const participantChange = {
  pName,
  pAge,
  pStudyField,

  // Arrow function version (NOT shorthand)
  displayInfo: () => {
    console.log(
      ` Task 3 outcome: pName: ${this.pName}, pAge: ${this.pAge}, pStudyField: ${this.pStudyField}`
    );
  },
};

participantChange.displayInfo();

/* Task 4: Using Computed Property pNames */
// TODO: Implement a function named `updateParticipantInfo` that takes a property name and value as arguments alongside an object and returns a new object with that property dynamically set.

function updatedParticipantInfo(currValue, value) {
  return {
    ...participant,
    [currValue]: value,
  };
}
const participant2 = updatedParticipantInfo("pAge", 25);
console.log(
  `Task 4 outcome: Name = ${participant2.pName}, Age = ${participant2.pAge}, Study Field = ${participant2.pStudyField}`
);
