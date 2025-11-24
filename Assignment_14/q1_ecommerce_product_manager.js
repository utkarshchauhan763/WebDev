/**
 * Assignment 14 - Q1: E-Commerce Product Manager
 * Classes + Objects for product management
 */

"use strict";

console.log("=== Q1: E-Commerce Product Manager ===");

// Product class definition
class Product {
    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }

    /**
     * Apply discount to the product price
     * @param {number} discountPercent - Discount percentage (e.g., 10 for 10%)
     */
    applyDiscount(discountPercent) {
        if (discountPercent < 0 || discountPercent > 100) {
            console.log("Invalid discount percentage. Must be between 0-100.");
            return;
        }
        
        const discountAmount = (this.price * discountPercent) / 100;
        const originalPrice = this.price;
        this.price = this.price - discountAmount;
        
        console.log(`Discount applied to ${this.name}: ${discountPercent}% off`);
        console.log(`Original: ₹${originalPrice} → New: ₹${this.price.toFixed(2)}`);
    }

    /**
     * Display formatted product details
     * @returns {string} - Formatted product information
     */
    displayDetails() {
        return `
🛍️ Product Details:
   ID: ${this.id}
   Name: ${this.name}
   Price: ₹${this.price.toFixed(2)}
   Category: ${this.category}
`;
    }

    /**
     * Get basic product info for listings
     * @returns {string} - Short product summary
     */
    getProductSummary() {
        return `${this.name} - ₹${this.price.toFixed(2)} (${this.category})`;
    }
}

// Create multiple product objects
const products = [
    new Product(1, "iPhone 15", 79999, "Electronics"),
    new Product(2, "Samsung Galaxy S24", 74999, "Electronics"),
    new Product(3, "Nike Air Max", 8999, "Footwear"),
    new Product(4, "MacBook Pro", 199999, "Electronics"),
    new Product(5, "Adidas T-Shirt", 1299, "Clothing"),
    new Product(6, "Sony Headphones", 15999, "Electronics"),
    new Product(7, "Levi's Jeans", 3499, "Clothing"),
    new Product(8, "Dell Monitor", 25999, "Electronics")
];

console.log("\n--- All Products ---");
products.forEach(product => {
    console.log(product.getProductSummary());
});

console.log("\n--- Products with Price > ₹10,000 ---");
// Filter products with price > 10000
const expensiveProducts = products.filter(product => product.price > 10000);

expensiveProducts.forEach(product => {
    console.log(product.displayDetails());
});

console.log(`\nFound ${expensiveProducts.length} products above ₹10,000`);

// Demonstrate discount functionality
console.log("\n--- Applying Discounts ---");
products[0].applyDiscount(10); // iPhone 15 - 10% off
products[3].applyDiscount(5);  // MacBook Pro - 5% off

console.log("\n--- Updated Expensive Products ---");
const updatedExpensiveProducts = products.filter(product => product.price > 10000);
updatedExpensiveProducts.forEach(product => {
    console.log(`${product.name}: ₹${product.price.toFixed(2)}`);
});

// Category-wise analysis
console.log("\n--- Category Analysis ---");
const categories = {};
products.forEach(product => {
    if (!categories[product.category]) {
        categories[product.category] = [];
    }
    categories[product.category].push(product);
});

for (const category in categories) {
    console.log(`\n${category} (${categories[category].length} items):`);
    categories[category].forEach(product => {
        console.log(`  - ${product.getProductSummary()}`);
    });
}