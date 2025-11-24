"use strict";

// Q3: user object with showName as an arrow function vs a normal function
// Arrow functions do not have their own 'this' — they use the enclosing scope's 'this'.

const userArrow = {
  name: "Bob",
  showName: () => {
    // 'this' here is NOT the userArrow object. In Node's module scope it is undefined.
    console.log("Arrow function -> this.name:", this && this.name);
    console.log("Arrow function -> this is:", this);
  }
};

console.log("Calling userArrow.showName() (arrow):");
userArrow.showName();

// Fix using a normal function (method shorthand or regular function expression)
const userNormal = {
  name: "Bob",
  showName() {
    // Now 'this' refers to the object that called the method
    console.log("Normal function -> this.name:", this.name);
  }
};

console.log("\nCalling userNormal.showName() (normal):");
userNormal.showName();

/* Explanation:
 - Arrow functions do not bind their own `this`; they inherit `this` from the surrounding scope.
 - Methods intended to use the object as `this` should be regular functions (method shorthand or function expressions).
*/
