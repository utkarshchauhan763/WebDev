"use strict";

// Q2: applyOperation(numbers, operation)
// Applies a callback operation to each element of the array (like map).
function applyOperation(numbers, operation) {
  if (!Array.isArray(numbers)) throw new TypeError("numbers must be an array");
  if (typeof operation !== "function") throw new TypeError("operation must be a function");
  return numbers.map(operation);
}

const nums = [1, 2, 3, 4];
console.log("Original:", nums);
console.log("Doubled:", applyOperation(nums, n => n * 2));
console.log("Squared:", applyOperation(nums, n => n * n));
