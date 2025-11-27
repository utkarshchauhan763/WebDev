import React from 'react';

function StudentDetails({ student, onBack }) {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Student Details</h2>
      
      <div style={detailsContainer}>
        <div style={detailRow}>
          <strong>ID:</strong>
          <span>{student.id}</span>
        </div>
        
        <div style={detailRow}>
          <strong>Name:</strong>
          <span>{student.name}</span>
        </div>
        
        <div style={detailRow}>
          <strong>Section:</strong>
          <span>{student.section}</span>
        </div>
        
        <div style={detailRow}>
          <strong>Marks:</strong>
          <span>{student.marks}</span>
        </div>
        
        <div style={detailRow}>
          <strong>Grade:</strong>
          <span>{student.grade}</span>
        </div>
      </div>

      <button onClick={onBack} style={buttonStyle}>
        Back to List
      </button>
    </div>
  );
}

// Simple inline styles
const detailsContainer = {
  maxWidth: '500px',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: 'black',
};

const detailRow = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 0',
  borderBottom: '1px solid #ddd',
};

const buttonStyle = {
  padding: '10px 20px',
  marginTop: '20px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
};

export default StudentDetails;
