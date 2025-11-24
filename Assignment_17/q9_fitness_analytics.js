"use strict";

// Q9: Fitness App Analytics (Array Methods + Error Handling)
class FitnessAnalytics {
  constructor(workoutData) {
    if (!workoutData || workoutData.length === 0) {
      throw new Error("Dataset cannot be empty!");
    }
    this.workoutData = workoutData;
  }

  // Get users with steps > 7000
  getActiveUsers() {
    return this.workoutData.filter(user => user.steps > 7000);
  }

  // Calculate average calories using reduce
  getAverageCalories() {
    const total = this.workoutData.reduce((sum, user) => sum + user.calories, 0);
    return total / this.workoutData.length;
  }

  // Format user summaries using map
  getUserSummary() {
    return this.workoutData.map(user => {
      const status = user.steps > 7000 ? "Active" : "Inactive";
      return `${user.user}: ${user.steps} steps, ${user.calories} calories burned (${status})`;
    });
  }

  displayAnalytics() {
    console.log("\n=== Fitness Analytics Report ===\n");

    console.log("1. Active Users (steps > 7000):");
    const activeUsers = this.getActiveUsers();
    activeUsers.forEach(u => console.log(`   ${u.user}: ${u.steps} steps`));

    console.log("\n2. Average Calories Burned:");
    console.log(`   ${this.getAverageCalories().toFixed(2)} calories`);

    console.log("\n3. User Summary:");
    const summaries = this.getUserSummary();
    summaries.forEach(summary => console.log(`   ${summary}`));
  }
}

// Test data
const workoutData = [
  { user: "A", steps: 8000, calories: 300 },
  { user: "B", steps: 12000, calories: 500 },
  { user: "C", steps: 4000, calories: 200 }
];

console.log("=== Fitness App Analytics ===");

// Test with valid data
try {
  const analytics = new FitnessAnalytics(workoutData);
  analytics.displayAnalytics();
} catch (error) {
  console.error(`Error: ${error.message}`);
}

// Test with empty dataset
console.log("\n\n--- Testing Error Handling ---");
try {
  const emptyAnalytics = new FitnessAnalytics([]);
  emptyAnalytics.displayAnalytics();
} catch (error) {
  console.error(`✗ Error: ${error.message}`);
}

console.log("\n[Array Methods]: filter(), reduce(), and map() used for data analysis");
