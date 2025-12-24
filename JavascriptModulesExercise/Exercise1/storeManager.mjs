import { addItem, removeItem, listItems } from "./inventory.mjs";

addItem("water");
addItem("kleenex");
addItem("laundry soap");

console.log(listItems());

removeItem("kleenex");

console.log(listItems());
