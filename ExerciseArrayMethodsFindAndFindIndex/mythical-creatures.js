const mythicalCreatures = [
  { name: "Dragon", type: "Fire", lastSeen: "Volcano Valley" },
  { name: "Mermaid", type: "Water", lastSeen: "Coral Caves" },
  { name: "Unicorn", type: "Land", lastSeen: "Enchanted Forest" },
  { name: "Griffin", type: "Air", lastSeen: "Highwind Mountains" },
  { name: "Kraken", type: "Water", lastSeen: "Abyssal Depths" },
];

// - Use the **`find`** method to locate the first creature of the "Water" type and log its name to the console.
// - Use the **`findIndex`** method to locate the index of the "Griffin" in the mythical creatures array and log it to the console.
// - Use the **`find`** method to locate the first creature last seen in "Enchanted Forest".

// 1st Task
const waterCreature = mythicalCreatures.find(function (creature) {
  return creature.type === "Water";
});

console.log(waterCreature.name);

const findFirstWaterCreature = function (arr) {
  return arr.find(function (creature) {
    return creature.type === "Water";
  });
};

const funcWaterCreature = findFirstWaterCreature(mythicalCreatures);
console.log(
  `The first mythical creature I found of the type water is named: ${funcWaterCreature.name}`
);

// 2nd Task
const findIndexGriffin = mythicalCreatures.findIndex(function (creature) {
  return creature.name === "Griffin";
});

console.log(`The index of Griffin is ${findIndexGriffin}`);

const funcFindIndexGriffin = function (arr) {
  return arr.findIndex(function (creature) {
    return creature.name === "Griffin";
  });
};

const findIndexofGriffin = funcFindIndexGriffin(mythicalCreatures);
console.log(
  `The index of Griffin is ${findIndexofGriffin} and this shows it works as a function too`
);

funcFindIndexGriffin(mythicalCreatures);

// Third Task

const funcCreatureOfEnchantedForest = function (arr) {
  return arr.find(function (creature) {
    return creature.lastSeen === "Enchanted Forest";
  });
};
const creatureOfEnchantedForest =
  funcCreatureOfEnchantedForest(mythicalCreatures);
console.log(
  `The first creature last seen in the enchanted forest is:  `,
  creatureOfEnchantedForest
);
