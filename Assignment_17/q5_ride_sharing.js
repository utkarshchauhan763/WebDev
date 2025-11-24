"use strict";

// Q5: Ride-Sharing Application (Inheritance + Error Handling)
class User {
  constructor(name, rating) {
    this.name = name;
    this.rating = rating;
  }

  displayInfo() {
    console.log(`User: ${this.name}, Rating: ${this.rating}⭐`);
  }
}

class Driver extends User {
  constructor(name, rating, vehicleNumber, vehicleType) {
    super(name, rating);
    this.vehicleNumber = vehicleNumber;
    this.vehicleType = vehicleType;
  }

  displayInfo() {
    super.displayInfo();
    console.log(`Vehicle: ${this.vehicleType} (${this.vehicleNumber})`);
  }
}

class Trip {
  constructor(fromLocation, toLocation, distance) {
    this.fromLocation = fromLocation;
    this.toLocation = toLocation;
    this.distance = distance;
  }

  calculateFare() {
    // Error handling for invalid distance
    if (this.distance === undefined || this.distance === null) {
      throw new Error("Distance not provided!");
    }
    if (this.distance < 0) {
      throw new Error("Distance cannot be negative!");
    }
    if (this.distance === 0) {
      throw new Error("Distance must be greater than 0!");
    }

    const baseFare = 50;
    const perKmRate = 12;
    const fare = baseFare + (this.distance * perKmRate);
    return fare;
  }

  displayTrip() {
    console.log(`\nTrip: ${this.fromLocation} → ${this.toLocation}`);
    console.log(`Distance: ${this.distance} km`);
  }
}

console.log("=== Ride-Sharing Application ===\n");

const driver1 = new Driver("Rajesh", 4.5, "MH-01-AB-1234", "Sedan");
driver1.displayInfo();

// Valid trip
try {
  const trip1 = new Trip("Mumbai Central", "Andheri", 15);
  trip1.displayTrip();
  console.log(`Fare: ₹${trip1.calculateFare()}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
}

// Invalid trip - negative distance
try {
  const trip2 = new Trip("Dadar", "Bandra", -5);
  trip2.displayTrip();
  console.log(`Fare: ₹${trip2.calculateFare()}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
}

// Invalid trip - distance not provided
try {
  const trip3 = new Trip("Thane", "Powai");
  trip3.displayTrip();
  console.log(`Fare: ₹${trip3.calculateFare()}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
}

console.log("\n[Error Handling]: Validates distance and throws meaningful errors");
