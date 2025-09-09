// Problem: Create an array containing different types of fruits
const fruits = [
  "Apple",
  "Banana",
  "Orange",
  "Mango",
  "Grapes",
];
console.log(fruits);

// Problem: Add "Strawberry" to the existing list of fruits
fruits.push("Strawberry");

// Problem: Remove "Orange" from the list of fruits
const index = fruits.indexOf("Orange");
if (index > -1) {
  fruits.splice(index, 1);
}

// Problem: Filter the list to only include fruits that are not "Banana"
const noBananaFruits = fruits.filter((fruit) => fruit !== "Banana");

// Problem: Sort the list of fruits in alphabetical order
const sortedFruits = [...fruits].sort();
console.log(sortedFruits);

// Problem: Use a for loop to print each type of fruit in the array
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// Problem: Use a for loop to count how many fruits are more than 5 characters long
let longNameFruits = 0;
for (let i = 0; i < fruits.length; i++) {
  if (fruits[i].length > 5) {
    longNameFruits++;
  }
}

// Problem: Use a for loop to create a new array with all fruit names in uppercase
const uppercaseFruits = [];
for (let i = 0; i < fruits.length; i++) {
  uppercaseFruits.push(fruits[i].toUpperCase());
}

// Problem: Use a for loop to find the fruit name with the most characters
let longestFruit = "";
for (let i = 0; i < fruits.length; i++) {
  if (fruits[i].length > longestFruit.length) {
    longestFruit = fruits[i];
  }
}

// Problem: Use a for loop to reverse the order of the fruits in the array
const reversedFruits = [];
for (let i = fruits.length - 1; i >= 0; i--) {
  reversedFruits.push(fruits[i]);
}
