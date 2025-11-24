"use strict";

// Q4: Employee Inheritance (Runtime Polymorphism)
class Employee {
  constructor(name, department) {
    this.name = name;
    this.department = department;
  }

  work() {
    console.log(`${this.name} is working in ${this.department} department`);
  }

  getDetails() {
    console.log(`Employee: ${this.name}, Department: ${this.department}`);
  }
}

class Manager extends Employee {
  constructor(name, department, teamSize) {
    super(name, department);
    this.teamSize = teamSize;
  }

  // Override work() method - runtime polymorphism
  work() {
    console.log(`${this.name} is managing a team of ${this.teamSize} in ${this.department} department`);
  }

  getDetails() {
    super.getDetails();
    console.log(`Team Size: ${this.teamSize}`);
  }
}

console.log("=== Employee Management System ===\n");

const emp1 = new Employee("John", "IT");
const emp2 = new Employee("Sarah", "Marketing");
const mgr1 = new Manager("David", "Sales", 10);
const mgr2 = new Manager("Emily", "HR", 5);

// Demonstrate polymorphism - same method name, different behavior
emp1.getDetails();
emp1.work();

console.log();
emp2.getDetails();
emp2.work();

console.log();
mgr1.getDetails();
mgr1.work();

console.log();
mgr2.getDetails();
mgr2.work();

console.log("\n[Polymorphism]: Manager.work() overrides Employee.work() - runtime behavior varies");
