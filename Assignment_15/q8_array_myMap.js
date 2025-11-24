"use strict";

// Q8: Add custom prototype method myMap() to Array
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function (callback) {
    if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
    const result = [];
    for (let i = 0; i < this.length; i++) {
      // call with (value, index, array) to mirror built-in map
      result.push(callback(this[i], i, this));
    }
    return result;
  };
}

console.log([1, 2, 3].myMap(n => n * 2)); // [2,4,6]
