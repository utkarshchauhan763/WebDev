"use strict";

// Q3: Product Discount System (Constructor + Prototype)
function Product(name, price) {
  this.name = name;
  this.price = price;
}

// Add prototype method for applying discount
Product.prototype.applyDiscount = function(percent) {
  if (percent < 0 || percent > 100) {
    throw new Error("Discount percent must be between 0 and 100");
  }
  const discountAmount = (this.price * percent) / 100;
  const newPrice = this.price - discountAmount;
  return newPrice;
};

Product.prototype.displayInfo = function() {
  console.log(`\nProduct: ${this.name}`);
  console.log(`Original Price: ₹${this.price}`);
};

// Create 3 products
const laptop = new Product("Laptop", 50000);
const phone = new Product("Smartphone", 25000);
const headphones = new Product("Headphones", 3000);

console.log("=== Product Discount System ===");

laptop.displayInfo();
console.log(`After 10% discount: ₹${laptop.applyDiscount(10)}`);

phone.displayInfo();
console.log(`After 15% discount: ₹${phone.applyDiscount(15)}`);

headphones.displayInfo();
console.log(`After 20% discount: ₹${headphones.applyDiscount(20)}`);

console.log("\n[Abstraction]: applyDiscount() provides a simple interface hiding calculation details");
