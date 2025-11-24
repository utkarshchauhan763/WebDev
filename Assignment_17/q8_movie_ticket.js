"use strict";

// Q8: Movie Ticket Booking System (Inheritance + Prototype Chain)
class MovieTicket {
  constructor(movieName, seatNo, price) {
    this.movieName = movieName;
    this.seatNo = seatNo;
    this.price = price;
  }

  getDetails() {
    console.log(`\nMovie: ${this.movieName}`);
    console.log(`Seat: ${this.seatNo}`);
    console.log(`Base Price: ₹${this.price}`);
  }
}

// Add prototype method
MovieTicket.prototype.printTicket = function() {
  console.log("\n========== TICKET ==========");
  console.log(`Movie: ${this.movieName}`);
  console.log(`Seat No: ${this.seatNo}`);
  console.log(`Price: ₹${this.price}`);
  console.log("============================");
};

class OnlineTicket extends MovieTicket {
  constructor(movieName, seatNo, price, convenienceFee) {
    super(movieName, seatNo, price);
    this.convenienceFee = convenienceFee;
  }

  getTotalAmount() {
    return this.price + this.convenienceFee;
  }

  getDetails() {
    super.getDetails();
    console.log(`Convenience Fee: ₹${this.convenienceFee}`);
    console.log(`Total Amount: ₹${this.getTotalAmount()}`);
  }
}

console.log("=== Movie Ticket Booking System ===\n");

// Regular ticket
const ticket1 = new MovieTicket("Inception", "A12", 250);
ticket1.getDetails();
ticket1.printTicket();

console.log("\n--- Online Booking ---");

// Online ticket
const onlineTicket1 = new OnlineTicket("Interstellar", "B15", 300, 50);
onlineTicket1.getDetails();

// Call prototype method from parent class (demonstrates prototype chain)
onlineTicket1.printTicket();

console.log("\n[Prototype Chain]: OnlineTicket can access printTicket() from MovieTicket.prototype");
console.log(`onlineTicket1.printTicket === ticket1.printTicket: ${onlineTicket1.printTicket === ticket1.printTicket}`);
