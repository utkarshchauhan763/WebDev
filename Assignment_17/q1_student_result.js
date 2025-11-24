"use strict";

// Q1: Student Result Processing (reduce + Classes)
class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = marks;
  }

  calculateAverage() {
    if (!this.marks.length) return 0;
    const total = this.marks.reduce((sum, mark) => sum + mark, 0);
    return total / this.marks.length;
  }

  getGrade() {
    const avg = this.calculateAverage();
    if (avg >= 90) return "A";
    if (avg >= 75) return "B";
    if (avg >= 50) return "C";
    return "F";
  }

  displayResult() {
    console.log(`\nStudent: ${this.name}`);
    console.log(`Marks: ${this.marks.join(", ")}`);
    console.log(`Average: ${this.calculateAverage().toFixed(2)}`);
    console.log(`Grade: ${this.getGrade()}`);
  }
}

// Test for 3 students
const student1 = new Student("Alice", [85, 90, 88, 92]);
const student2 = new Student("Bob", [60, 70, 65, 68]);
const student3 = new Student("Charlie", [40, 45, 38, 42]);

student1.displayResult();
student2.displayResult();
student3.displayResult();
