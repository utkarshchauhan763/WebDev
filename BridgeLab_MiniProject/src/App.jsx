import { useState } from 'react'
import './App.css'
import StudentList from './components/StudentList'
import StudentForm from './components/StudentForm'
import StudentDetails from './components/StudentDetails'
import { getAllStudents, addStudent, updateStudent, deleteStudent } from './services/studentService'

function App() {
  // All state variables using useState
  const [students, setStudents] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'form', 'details'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load all students from JSON Server
  const handleLoadStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
      alert('Students loaded successfully!');
    } catch (error) {
      alert('Error loading students. Make sure JSON Server is running!');
      console.error(error);
    }
  };

  // Show add student form
  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsEditing(false);
    setCurrentView('form');
  };

  // Show edit student form
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsEditing(true);
    setCurrentView('form');
  };

  // Save student (add or update)
  const handleSaveStudent = async (student) => {
    try {
      if (isEditing) {
        // Update existing student
        await updateStudent(student.id, student);
        alert('Student updated successfully! Click "Load Students" to see changes.');
      } else {
        // Add new student
        await addStudent(student);
        alert('Student added successfully! Click "Load Students" to see changes.');
      }
      setCurrentView('list');
    } catch (error) {
      alert('Error saving student!');
      console.error(error);
    }
  };

  // Delete student
  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(id);
      alert('Student deleted successfully! Click "Load Students" to see changes.');
    } catch (error) {
      alert('Error deleting student!');
      console.error(error);
    }
  };

  // Show student details
  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setCurrentView('details');
  };

  // Go back to list view
  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedStudent(null);
    setIsEditing(false);
  };

  // Render different views based on currentView state
  return (
    <div className="App">
      {currentView === 'list' && (
        <StudentList
          students={students}
          onLoadStudents={handleLoadStudents}
          onAddStudent={handleAddStudent}
          onEditStudent={handleEditStudent}
          onDeleteStudent={handleDeleteStudent}
          onViewDetails={handleViewDetails}
        />
      )}

      {currentView === 'form' && (
        <StudentForm
          studentToEdit={selectedStudent}
          onSave={handleSaveStudent}
          onCancel={handleBackToList}
        />
      )}

      {currentView === 'details' && (
        <StudentDetails
          student={selectedStudent}
          onBack={handleBackToList}
        />
      )}
    </div>
  )
}

export default App
