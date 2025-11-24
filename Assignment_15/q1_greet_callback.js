"use strict";

// Q1: greetUser(name, callback)
// Prints a greeting, then calls the callback which prints the end message.
function showEndMessage() {
  console.log("Welcome to the course!");
}

function greetUser(name, callback) {
  console.log(`Hello ${name}`);
  // demonstrate callback flow
  if (typeof callback === "function") {
    callback();
  } else {
    console.log("No callback provided");
  }
}

// Demo:
greetUser("Alice", showEndMessage);

// Expected output:
// Hello Alice
// Welcome to the course!
