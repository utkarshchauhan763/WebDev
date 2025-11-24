"use strict";

// Q6: E-Commerce Inventory System (Array Methods)
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 50000, stock: 5 },
  { id: 2, name: "Phone", category: "Electronics", price: 25000, stock: 2 },
  { id: 3, name: "Shirt", category: "Clothing", price: 800, stock: 20 },
  { id: 4, name: "Jeans", category: "Clothing", price: 1500, stock: 15 },
  { id: 5, name: "Headphones", category: "Electronics", price: 3000, stock: 8 },
  { id: 6, name: "Watch", category: "Accessories", price: 5000, stock: 3 },
  { id: 7, name: "Shoes", category: "Footwear", price: 2500, stock: 1 },
  { id: 8, name: "Bag", category: "Accessories", price: 1200, stock: 10 }
];

// 1. Get low stock products (stock <= 5)
function getLowStockProducts(inventory) {
  return inventory.filter(product => product.stock <= 5);
}

// 2. Sort products by price (ascending)
function sortProductsByPrice(inventory) {
  return [...inventory].sort((a, b) => a.price - b.price);
}

// 3. Calculate total inventory value
function calculateTotalInventoryValue(inventory) {
  return inventory.reduce((total, product) => {
    return total + (product.price * product.stock);
  }, 0);
}

// 4. Group products by category
function groupByCategory(inventory) {
  return inventory.reduce((grouped, product) => {
    const category = product.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(product);
    return grouped;
  }, {});
}

console.log("=== E-Commerce Inventory System ===\n");

console.log("1. Low Stock Products (stock ≤ 5):");
const lowStock = getLowStockProducts(products);
lowStock.forEach(p => console.log(`   ${p.name} - Stock: ${p.stock}`));

console.log("\n2. Products Sorted by Price:");
const sorted = sortProductsByPrice(products);
sorted.forEach(p => console.log(`   ${p.name} - ₹${p.price}`));

console.log("\n3. Total Inventory Value:");
const totalValue = calculateTotalInventoryValue(products);
console.log(`   ₹${totalValue.toLocaleString()}`);

console.log("\n4. Products Grouped by Category:");
const grouped = groupByCategory(products);
Object.keys(grouped).forEach(category => {
  console.log(`\n   ${category}:`);
  grouped[category].forEach(p => console.log(`     - ${p.name} (₹${p.price})`));
});
