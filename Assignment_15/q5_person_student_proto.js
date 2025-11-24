"use strict";

// Q5: Person constructor and Student inheriting from Person (prototype-based)
function Person(name) {
  this.name = name;
}

Person.prototype.printName = function () {
  console.log(`Name: ${this.name}`);
};

function Student(name, branch) {
  // inherit properties
  Person.call(this, name);
  this.branch = branch;
}

// inherit prototype methods
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.printBranch = function () {
  console.log(`Branch: ${this.branch}`);
};

// Demo
const student = new Student("Charlie", "Computer Science");
student.printName();
student.printBranch();

// Show prototype chain
console.log("student instanceof Student:", student instanceof Student);
console.log("student instanceof Person:", student instanceof Person);
