"use strict";

// Q9: Rewrite Person -> Student inheritance using ES6 classes
class Person {
  constructor(name) {
    this.name = name;
  }
  printName() {
    console.log(`Name: ${this.name}`);
  }
}

class Student extends Person {
  constructor(name, branch) {
    super(name);
    this.branch = branch;
  }
  printBranch() {
    console.log(`Branch: ${this.branch}`);
  }
}

const s = new Student("Eve", "ECE");
s.printName();
s.printBranch();

// Comparison note (in comments):
// The ES6 class syntax provides clearer, modern syntax, but under the hood
// it still uses prototype-based inheritance. Behavior is analogous to the
// constructor+prototype example in Q5.
