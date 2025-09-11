// // Object.prototype.js = function () {
// //     return "THis is JS Class"
// // };

// // const person1 = {
// //     name: "John",
// //     age: 30,
// // };

// // const arr = [1, 2, 3];

// // console.log(arr.js());

// // console.log(person1.name);

// if (!Array.prototype.myFilter) {
//    Array.prototype.myFilter = function (callback){
//     const result = []
//     for(let i = 0; i < this.length; i++){
//         if(callback(this[i])){
//             result.push(this[i])
//         }
//     }
//     return result
//    }
// }

// const fruits = [
//   "Apple",
//   "Banana",
//   "Orange",
//   "Mango",
//   "Grapes",
// ];

// const noBananaFruits = fruits.filter((fruit) => fruit !== "Banana");
// const myNoBananaFruits = fruits.myFilter((fruit) => fruit !== "Banana");

// console.log("pehly bana howa",noBananaFruits);
// console.log("mara ka bana howa",myNoBananaFruits);

// function cb(callback){
//     return callback
// }

// function pass(){
//     return "Ma hoon call Back"
// }

// console.log(cb(pass()))

const arr = [1, 2, 3, 4, 5];

const arr2 = arr.map((item) => item * 2);
console.log(arr2);

if (!Array.prototype.myMap) {
  Array.prototype.myMap = function (callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      console.log(this[i]);

      const value = callback(this[i]);
      result.push(value);
    }
    return result;
  };
}

// const myArray = arr.myMap((item) => item * 2);
// console.log(myArray);
