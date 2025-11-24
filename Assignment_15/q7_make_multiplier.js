"use strict";

// Q7: makeMultiplier(multiplier) returns a function that multiplies by multiplier
function makeMultiplier(multiplier) {
  // multiplier is captured by the returned function (closure)
  return function (number) {
    return number * multiplier;
  };
}

const triple = makeMultiplier(3);
console.log("triple(5):", triple(5)); // 15

/* Closure explanation:
 - When makeMultiplier is called with multiplier (3), it returns an inner function.
 - That inner function keeps a reference to the outer function's environment where "multiplier" exists.
 - Even after makeMultiplier returns, the inner function can access multiplier — that's a closure.
*/
