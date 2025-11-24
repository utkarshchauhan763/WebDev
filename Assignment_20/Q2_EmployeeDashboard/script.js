// Q2 - Employee Status Dashboard using XMLHttpRequest

const API_URL = 'http://localhost:3002/employees';
let employees = [];

// Load employees on page load
window.addEventListener('DOMContentLoaded', function() {
  loadEmployees();
});

// Function to load all employees using XMLHttpRequest
function loadEmployees() {
  const xhr = new XMLHttpRequest();
  
  xhr.open('GET', API_URL, true);
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        employees = JSON.parse(xhr.responseText);
        displayEmployees();
        updateStats();
        
        // Hide loading, show content
        document.getElementById('loadingIndicator').style.display = 'none';
        document.getElementById('dashboardContent').style.display = 'block';
      } catch (error) {
        showError('Error parsing employee data');
      }
    } else {
      showError(`Error loading employees: ${xhr.status}`);
    }
  };
  
  xhr.onerror = function() {
    showError('Network error. Please ensure JSON Server is running on port 3002');
    document.getElementById('loadingIndicator').style.display = 'none';
  };
  
  xhr.send();
}

// Function to display employees in table
function displayEmployees() {
  const tbody = document.getElementById('employeesTableBody');
  tbody.innerHTML = '';
  
  employees.forEach(function(employee) {
    const row = document.createElement('tr');
    row.id = `employee-row-${employee.id}`;
    
    const isActive = employee.status === 'active';
    
    row.innerHTML = `
      <td>
        <div class="employee-name">${employee.name}</div>
        <div class="employee-email">${employee.email}</div>
      </td>
      <td>${employee.department}</td>
      <td>
        <span class="status-badge ${employee.status}">${employee.status}</span>
      </td>
      <td>
        <label class="toggle-switch">
          <input type="checkbox" ${isActive ? 'checked' : ''} 
                 onchange="toggleEmployeeStatus(${employee.id}, this)">
          <span class="slider"></span>
        </label>
      </td>
    `;
    
    tbody.appendChild(row);
  });
}

// Function to toggle employee status
function toggleEmployeeStatus(employeeId, toggleElement) {
  const employee = employees.find(emp => emp.id === employeeId);
  if (!employee) return;
  
  const newStatus = toggleElement.checked ? 'active' : 'inactive';
  const oldStatus = employee.status;
  
  // Optimistically update UI
  employee.status = newStatus;
  updateEmployeeRow(employeeId, newStatus);
  updateStats();
  
  // Send PATCH request using XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.open('PATCH', `${API_URL}/${employeeId}`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log(`Employee ${employeeId} status updated to ${newStatus}`);
    } else {
      // Revert on error
      showError(`Failed to update status: ${xhr.status}`);
      revertEmployeeStatus(employeeId, oldStatus, toggleElement);
    }
  };
  
  xhr.onerror = function() {
    // Revert on network error
    showError('Network error. Status update failed.');
    revertEmployeeStatus(employeeId, oldStatus, toggleElement);
  };
  
  xhr.send(JSON.stringify({ status: newStatus }));
}

// Function to update employee row visually
function updateEmployeeRow(employeeId, newStatus) {
  const row = document.getElementById(`employee-row-${employeeId}`);
  if (!row) return;
  
  const statusBadge = row.querySelector('.status-badge');
  statusBadge.className = `status-badge ${newStatus}`;
  statusBadge.textContent = newStatus;
}

// Function to revert employee status on error
function revertEmployeeStatus(employeeId, oldStatus, toggleElement) {
  const employee = employees.find(emp => emp.id === employeeId);
  if (!employee) return;
  
  // Revert data
  employee.status = oldStatus;
  
  // Revert toggle
  toggleElement.checked = oldStatus === 'active';
  
  // Revert UI
  updateEmployeeRow(employeeId, oldStatus);
  updateStats();
}

// Function to update statistics
function updateStats() {
  const activeCount = employees.filter(emp => emp.status === 'active').length;
  const inactiveCount = employees.filter(emp => emp.status === 'inactive').length;
  
  document.getElementById('activeCount').textContent = activeCount;
  document.getElementById('inactiveCount').textContent = inactiveCount;
}

// Function to show error message
function showError(message) {
  const errorDiv = document.getElementById('errorMessage');
  errorDiv.textContent = `⚠️ ${message}`;
  errorDiv.classList.add('show');
  
  setTimeout(function() {
    errorDiv.classList.remove('show');
  }, 4000);
}
