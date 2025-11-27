import React, { useState } from 'react';

function StudentForm({ studentToEdit, onSave, onCancel }) {
  // Initialize form state
  const [name, setName] = useState(studentToEdit ? studentToEdit.name : '');
  const [section, setSection] = useState(studentToEdit ? studentToEdit.section : '');
  const [marks, setMarks] = useState(studentToEdit ? studentToEdit.marks : '');
  const [grade, setGrade] = useState(studentToEdit ? studentToEdit.grade : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !section || !marks || !grade) {
      alert('Please fill all fields');
      return;
    }

    // Create student object
    const student = {
      name: name,
      section: section,
      marks: Number(marks),
      grade: grade,
    };

    // If editing, include the ID
    if (studentToEdit) {
      student.id = studentToEdit.id;
    }

    // Call the save function
    onSave(student);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{studentToEdit ? 'Edit Student' : 'Add New Student'}</h2>
      
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={fieldStyle}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            placeholder="Enter student name"
          />
        </div>

        <div style={fieldStyle}>
          <label>Section:</label>
          <input
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            style={inputStyle}
            placeholder="Enter section (A, B, C...)"
          />
        </div>

        <div style={fieldStyle}>
          <label>Marks:</label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            style={inputStyle}
            placeholder="Enter marks (0-100)"
            min="0"
            max="100"
          />
        </div>

        <div style={fieldStyle}>
          <label>Grade:</label>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            style={inputStyle}
            placeholder="Enter grade (A+, A, B, C...)"
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="submit" style={buttonStyle}>
            {studentToEdit ? 'Update Student' : 'Add Student'}
          </button>
          <button type="button" onClick={onCancel} style={cancelButtonStyle}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// Simple inline styles
const formStyle = {
  maxWidth: '500px',
  margin: '0 auto',
};

const fieldStyle = {
  marginBottom: '15px',
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginTop: '5px',
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#999',
};

export default StudentForm;
