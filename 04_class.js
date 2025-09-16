const person1 = {
    name: "John",
    age: 30,
    getFullName: function(){
        return `${this.name} ${this.age}`
    }
}

const person2 = {}

person2.__proto__ = person1

console.log(person2.getFullName());


class personcl1 {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    getFullName(){
        return `${this.name} ${this.age}`
    }
}

class personcl2 extends personcl1 {}


const p1 =new personcl2("Jhon", "Doe");

console.log(p1.getFullName());


































// const obj1 ={
//     fname: "John",
//     lname: "Doe",
//     age: 30,
//     getFullName: function(){
//         return `${this.fname} ${this.lname}`
//     }
// }

// obj2 = {
    
// }

// obj2.__proto__ = obj1

// console.log(obj2.getFullName());

// class Person1 {
//   constructor(fanme, lanme) {
//     this.xfname = fanme;
//     this.xlname = lanme;
//   }

//   getFullName() {
//     return `${this.xfname} ${this.xlname}`;
//   }
// }

// class person2 extends Person1{

// }

// const p1 = new Person("Jhon", "Doe");
// const p2 = new Person("Jhon", "Doe");
// console.log(p1.getFullName());
// console.log(p2.getFullName());

// const p1 =new person2("Jhon", "Doe");
// const p2 =new person2("Jhon", "Doe");
// console.log(p1.getFullName());
// console.log(p2.getFullName());





// Q4: Without using `class` keyword, create a `Student` constructor
// that has `name` and `rollNo`. Add a method `introduce` on its prototype
// that returns "My name is NAME and my roll number is ROLLNO".

// Create 2 students and call introduce().
