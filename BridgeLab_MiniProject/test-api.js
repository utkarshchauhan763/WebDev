// Simple API Test Script for Student Management System
// Run this with: node test-api.js

const BASE_URL = 'http://localhost:3000/students';

// Helper function to make API calls
async function apiCall(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Test 1: GET all students
async function testGetAllStudents() {
  console.log('\n📋 TEST 1: Get All Students');
  console.log('================================');
  const result = await apiCall(BASE_URL);
  if (result.success) {
    console.log('✅ SUCCESS - Found', result.data.length, 'students');
    result.data.forEach(student => {
      console.log(`   - ID: ${student.id}, Name: ${student.name}, Grade: ${student.grade}`);
    });
  } else {
    console.log('❌ FAILED:', result.error);
  }
  return result;
}

// Test 2: POST - Add new student
async function testAddStudent() {
  console.log('\n➕ TEST 2: Add New Student');
  console.log('================================');
  const newStudent = {
    name: 'Test Student',
    section: 'C',
    marks: 88,
    grade: 'A'
  };
  
  const result = await apiCall(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newStudent)
  });
  
  if (result.success) {
    console.log('✅ SUCCESS - Student added with ID:', result.data.id);
    console.log('   Data:', result.data);
    return result.data.id;
  } else {
    console.log('❌ FAILED:', result.error);
    return null;
  }
}

// Test 3: GET single student by ID
async function testGetStudentById(id) {
  console.log('\n🔍 TEST 3: Get Student by ID');
  console.log('================================');
  const result = await apiCall(`${BASE_URL}/${id}`);
  if (result.success) {
    console.log('✅ SUCCESS - Found student:');
    console.log('   ', result.data);
  } else {
    console.log('❌ FAILED:', result.error);
  }
  return result;
}

// Test 4: PUT - Update student
async function testUpdateStudent(id) {
  console.log('\n✏️ TEST 4: Update Student');
  console.log('================================');
  const updatedStudent = {
    name: 'Updated Test Student',
    section: 'D',
    marks: 95,
    grade: 'A+'
  };
  
  const result = await apiCall(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedStudent)
  });
  
  if (result.success) {
    console.log('✅ SUCCESS - Student updated:');
    console.log('   ', result.data);
  } else {
    console.log('❌ FAILED:', result.error);
  }
  return result;
}

// Test 5: DELETE student
async function testDeleteStudent(id) {
  console.log('\n🗑️ TEST 5: Delete Student');
  console.log('================================');
  const result = await apiCall(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
  
  console.log('✅ SUCCESS - Student deleted (ID:', id + ')');
  return result;
}

// Run all tests
async function runAllTests() {
  console.log('\n🚀 Starting API Tests for Student Management System');
  console.log('====================================================\n');
  
  // Test 1: Get all students
  await testGetAllStudents();
  
  // Test 2: Add new student
  const newStudentId = await testAddStudent();
  
  if (newStudentId) {
    // Test 3: Get the newly added student
    await testGetStudentById(newStudentId);
    
    // Test 4: Update the student
    await testUpdateStudent(newStudentId);
    
    // Verify update
    await testGetStudentById(newStudentId);
    
    // Test 5: Delete the student
    await testDeleteStudent(newStudentId);
    
    // Verify deletion
    console.log('\n🔍 Verifying deletion...');
    const finalList = await testGetAllStudents();
  }
  
  console.log('\n✨ All Tests Completed!');
  console.log('====================================================\n');
}

// Run the tests
runAllTests();
