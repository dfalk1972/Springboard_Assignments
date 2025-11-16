function mysteryOperation() {
  const outcome = Math.random(); // Generates a random number between 0 and 1.

  if (outcome < 0.5) {
    //console.log("The operation is completed successfully!");
  } else {
    throw new Error("The operation is failed mysteriously!");
  }
}

const numMissions = 20; //Number of missions this year
const unsuccessfulDays = 1; //You get one day for each failed mission
const successfulDays = 13; //You get 13 days for each mission successfully completed.
const attendanceDays = 3; //You get 3 days for just participating

let vacationDays = 0;

for (let i = 0; i < numMissions; i++) {
  try {
    mysteryOperation();
    vacationDays += successfulDays;
  } catch (Error) {
    vacationDays += unsuccessfulDays;
  } finally {
    vacationDays += attendanceDays;
  }
}
console.log(
  `Congratulations, you have been rewarded with ${vacationDays} vacation days for the year!`
);
