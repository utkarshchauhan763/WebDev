import React from 'react';

function StudentList({ students, onLoadStudents, onAddStudent, onEditStudent, onDeleteStudent, onViewDetails }) {
  
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      onDeleteStudent(id);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>🎓 Student Result Management</h1>
      
      <div style={buttonContainerStyle}>
        <button onClick={onLoadStudents} style={buttonStyle}>
          Load Students
        </button>
        <button onClick={onAddStudent} style={buttonStyle}>
          Add Student
        </button>
      </div>

      {students.length === 0 ? (
        <p style={emptyMessageStyle}>📋 No students found. Click "Load Students" to fetch data.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Section</th>
              <th style={thStyle}>Marks</th>
              <th style={thStyle}>Grade</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td style={tdStyle}>{student.id}</td>
                <td style={tdStyle}>{student.name}</td>
                <td style={tdStyle}>{student.section}</td>
                <td style={tdStyle}>{student.marks}</td>
                <td style={tdStyle}>{student.grade}</td>
                <td style={tdStyle}>
                  <button onClick={() => onViewDetails(student)} style={actionButtonStyle}>
                    View
                  </button>
                  <button onClick={() => onEditStudent(student)} style={actionButtonStyle}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(student.id, student.name)} style={deleteButtonStyle}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Professional inline styles
const containerStyle = {
  padding: '40px',
  background: 'white',
  borderRadius: '20px',
  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  maxWidth: '1100px',
  margin: '0 auto',
};

const titleStyle = {
  color: '#1a1a2e',
  fontSize: '36px',
  fontWeight: '700',
  marginBottom: '30px',
  textAlign: 'center',
};

const buttonContainerStyle = {
  marginBottom: '30px',
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
};

const buttonStyle = {
  padding: '12px 28px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  backgroundColor: '#667eea',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(102,126,234,0.3)',
};

const emptyMessageStyle = {
  fontSize: '18px',
  color: '#666',
  padding: '40px',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  marginTop: '20px',
};

const actionButtonStyle = {
  padding: '8px 16px',
  margin: '3px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 6px rgba(76,175,80,0.3)',
};

const deleteButtonStyle = {
  ...actionButtonStyle,
  backgroundColor: '#ef5350',
  boxShadow: '0 2px 6px rgba(239,83,80,0.3)',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0',
  marginTop: '20px',
  overflow: 'hidden',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};

const thStyle = {
  backgroundColor: '#667eea',
  color: 'white',
  padding: '16px',
  textAlign: 'left',
  fontWeight: '600',
  fontSize: '15px',
  border: 'none',
  letterSpacing: '0.5px',
};

const tdStyle = {
  padding: '16px',
  borderBottom: '1px solid #e9ecef',
  backgroundColor: '#fff',
  fontSize: '15px',
  color: '#2c3e50',
};

export default StudentList;
