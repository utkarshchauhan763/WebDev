"use strict";

// Q2: Online Food Ordering (map + Error Handling)
const menu = [
  { name: "Pizza", price: 250 },
  { name: "Burger", price: 120 },
  { name: "Pasta", price: 180 },
  { name: "Salad", price: 100 }
];

function calculateBill(orderItems) {
  // Validate each item exists in menu
  const prices = orderItems.map(itemName => {
    const menuItem = menu.find(item => item.name === itemName);
    if (!menuItem) {
      throw new Error(`Invalid item ordered: "${itemName}" is not on the menu!`);
    }
    return menuItem.price;
  });

  // Calculate total using reduce
  const total = prices.reduce((sum, price) => sum + price, 0);
  return total;
}

// Test cases
console.log("=== Food Ordering System ===\n");

// Valid order
try {
  const order1 = ["Pizza", "Burger", "Salad"];
  console.log(`Order: ${order1.join(", ")}`);
  const bill1 = calculateBill(order1);
  console.log(`Total Bill: ₹${bill1}\n`);
} catch (error) {
  console.error(`Error: ${error.message}\n`);
}

// Invalid order (item not on menu)
try {
  const order2 = ["Pizza", "Fries", "Pasta"];
  console.log(`Order: ${order2.join(", ")}`);
  const bill2 = calculateBill(order2);
  console.log(`Total Bill: ₹${bill2}\n`);
} catch (error) {
  console.error(`Error: ${error.message}\n`);
}

// Another valid order
try {
  const order3 = ["Burger", "Pasta"];
  console.log(`Order: ${order3.join(", ")}`);
  const bill3 = calculateBill(order3);
  console.log(`Total Bill: ₹${bill3}\n`);
} catch (error) {
  console.error(`Error: ${error.message}\n`);
}
