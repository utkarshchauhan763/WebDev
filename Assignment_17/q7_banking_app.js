"use strict";

// Q7: Banking Application (Private Fields + Error Handling)
class BankAccount {
  #balance; // private field

  constructor(accountHolder, initialBalance = 0) {
    this.accountHolder = accountHolder;
    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be negative");
    }
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this.#balance += amount;
    console.log(`✓ Deposited ₹${amount}. New balance: ₹${this.#balance}`);
  }

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }
    if (amount > this.#balance) {
      throw new Error(`Insufficient balance! Available: ₹${this.#balance}, Requested: ₹${amount}`);
    }
    this.#balance -= amount;
    console.log(`✓ Withdrawn ₹${amount}. Remaining balance: ₹${this.#balance}`);
  }

  getBalance() {
    return this.#balance;
  }

  displayInfo() {
    console.log(`\nAccount Holder: ${this.accountHolder}`);
    console.log(`Current Balance: ₹${this.getBalance()}`);
  }
}

console.log("=== Banking Application ===\n");

const account = new BankAccount("Amit Kumar", 5000);
account.displayInfo();

console.log("\n--- Valid Operations ---");
try {
  account.deposit(2000);
  account.withdraw(1500);
  account.deposit(500);
} catch (error) {
  console.error(`✗ Error: ${error.message}`);
}

console.log("\n--- Invalid Operations ---");

// Try to withdraw more than balance
try {
  account.withdraw(10000);
} catch (error) {
  console.error(`✗ Error: ${error.message}`);
}

// Try to deposit negative amount
try {
  account.deposit(-100);
} catch (error) {
  console.error(`✗ Error: ${error.message}`);
}

// Try to withdraw negative amount
try {
  account.withdraw(-50);
} catch (error) {
  console.error(`✗ Error: ${error.message}`);
}

account.displayInfo();

console.log("\n[Private Fields]: #balance cannot be accessed directly from outside the class");
console.log(`Attempting account.#balance would cause SyntaxError`);
