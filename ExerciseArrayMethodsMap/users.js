const users = [
  { firstName: "Alice", lastName: "Johnson", points: 120 },
  { firstName: "Bob", lastName: "Smith", points: 99 },
  { firstName: "Charlie", lastName: "Brown", points: 180 },
];

//return all users in a new array. Two new properties. If points are greater than 100 they should have membershipStatus = Premium, other wise <= 100 returns standard. Also return their full name as a combination of firstname and last name

const members = users.map(function (user) {
  let membershipStatus = "";

  if (user.points > 100) {
    membershipStatus = "Premium";
  } else {
    membershipStatus = "Standard";
  }
  return {
    fullName: `${user.firstName} ${user.lastName}`,
    membershipStatus: membershipStatus,

    //membershipStatus: user.points,
  };
});

console.log(members);
