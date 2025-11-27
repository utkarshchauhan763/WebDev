// API URL for JSON Server
const API_URL = 'http://localhost:3000/students';

// Get all students
export const getAllStudents = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

// Get single student by ID
export const getStudentById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  return data;
};

// Add new student
export const addStudent = async (student) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  const data = await response.json();
  return data;
};

// Update existing student
export const updateStudent = async (id, student) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  const data = await response.json();
  return data;
};

// Delete student
export const deleteStudent = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
