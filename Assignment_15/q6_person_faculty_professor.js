"use strict";

// Q6: Prototype chain Person -> Faculty -> Professor
function Person(name) {
  this.name = name;
}
Person.prototype.getPersonInfo = function () {
  console.log(`Person name: ${this.name}`);
};

function Faculty(name, department) {
  Person.call(this, name);
  this.department = department;
}
Faculty.prototype = Object.create(Person.prototype);
Faculty.prototype.constructor = Faculty;
Faculty.prototype.getFacultyInfo = function () {
  console.log(`Faculty dept: ${this.department}`);
};

function Professor(name, department, title) {
  Faculty.call(this, name, department);
  this.title = title;
}
Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;
Professor.prototype.getProfessorInfo = function () {
  console.log(`Professor title: ${this.title}`);
};

// Demo: a Professor can access methods from all levels
const prof = new Professor("Dr. Dana", "Mathematics", "Associate Professor");
prof.getPersonInfo();
prof.getFacultyInfo();
prof.getProfessorInfo();

console.log("Access chain: prof instanceof Professor, Faculty, Person =>",
  prof instanceof Professor, prof instanceof Faculty, prof instanceof Person);
