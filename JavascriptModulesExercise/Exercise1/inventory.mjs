// addItem that adds an item by name to the inventory array, removeItem that removes an item by name from the inventory array, listItems that logs all item names currently in the inventory.
const inventory = [];

export const listItems = function () {
  if (inventory.length < 1) {
    return `We are currently out of everything. Sorry!`;
  } else {
    let result = console.log(`The items currently in stock are: `);
    for (const item of inventory) {
      console.log(item);
    }
    return result;
  }
};
console.log(listItems());

//add items to inventory by name
export const addItem = (item) => {
  inventory.push(item);
  console.log(`${item} was added to inventory`);
};

//remove items from inventory by name

export const removeItem = (item) => {
  let isRemoved = false;
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i] === item) {
      inventory.splice(i, 1);
      isRemoved = true;
    }
  }
  if (isRemoved) {
    console.log(`${item} has been removed from inventory.`);
  } else {
    console.log(`${item} does not exist in inventory.`);
  }
};
