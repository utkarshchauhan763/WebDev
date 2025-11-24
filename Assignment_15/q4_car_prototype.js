"use strict";

// Q4: Car constructor and prototype method getDetails()
function Car(brand, model) {
  this.brand = brand;
  this.model = model;
}

Car.prototype.getDetails = function () {
  console.log(`Car: ${this.brand} ${this.model}`);
};

// Create two car objects; they share getDetails via prototype
const car1 = new Car("Toyota", "Corolla");
const car2 = new Car("Honda", "Civic");

car1.getDetails();
car2.getDetails();

// Demonstrates method sharing: both objects call the same function on Car.prototype
console.log("car1.getDetails === car2.getDetails:", car1.getDetails === car2.getDetails);
