// Q6 - User Registration with Duplicate Check using Axios

const API_URL = 'http://localhost:3006/users';
let emailCheckTimeout;

// Load existing users on page load
window.addEventListener('DOMContentLoaded', function() {
  loadExistingUsers();
});

// Email input real-time validation
document.getElementById('email').addEventListener('input', function() {
  clearTimeout(emailCheckTimeout);
  
  const email = this.value.trim();
  
  if (email.length > 0) {
    // Show checking badge
    document.getElementById('checkingBadge').classList.add('show');
    document.getElementById('emailError').classList.remove('show');
    
    // Debounce: Check after 500ms of no typing
    emailCheckTimeout = setTimeout(function() {
      checkEmailExists(email);
    }, 500);
  } else {
    document.getElementById('checkingBadge').classList.remove('show');
  }
});

// Form submission
document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  
  // Validate fields
  if (!validateForm(name, email, phone)) {
    return;
  }
  
  // Check email and register
  checkAndRegister(name, email, phone);
});

// Function to check if email exists
function checkEmailExists(email) {
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const checkingBadge = document.getElementById('checkingBadge');
  
  // Axios GET request to check email
  axios.get(API_URL, {
    params: {
      email: email
    }
  })
  .then(response => {
    checkingBadge.classList.remove('show');
    
    if (response.data.length > 0) {
      // Email already exists
      emailInput.classList.add('error');
      emailInput.classList.remove('success');
      emailError.textContent = '❌ Email already registered';
      emailError.classList.add('show');
    } else {
      // Email is available
      emailInput.classList.add('success');
      emailInput.classList.remove('error');
      emailError.classList.remove('show');
    }
  })
  .catch(error => {
    checkingBadge.classList.remove('show');
    console.error('Error checking email:', error);
    emailError.textContent = 'Error checking email';
    emailError.classList.add('show');
  });
}

// Function to validate form
function validateForm(name, email, phone) {
  let isValid = true;
  
  // Validate name
  if (name.length === 0) {
    document.getElementById('name').classList.add('error');
    document.getElementById('nameError').classList.add('show');
    isValid = false;
  } else {
    document.getElementById('name').classList.remove('error');
    document.getElementById('nameError').classList.remove('show');
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('email').classList.add('error');
    document.getElementById('emailError').textContent = 'Please enter a valid email';
    document.getElementById('emailError').classList.add('show');
    isValid = false;
  }
  
  // Validate phone
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    document.getElementById('phone').classList.add('error');
    document.getElementById('phoneError').classList.add('show');
    isValid = false;
  } else {
    document.getElementById('phone').classList.remove('error');
    document.getElementById('phoneError').classList.remove('show');
  }
  
  return isValid;
}

// Function to check email and register
function checkAndRegister(name, email, phone) {
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Checking...';
  
  // First, check if email exists using Axios GET
  axios.get(API_URL, {
    params: {
      email: email
    }
  })
  .then(response => {
    if (response.data.length > 0) {
      // Email already exists - show error
      document.getElementById('email').classList.add('error');
      document.getElementById('emailError').textContent = '❌ Email already registered';
      document.getElementById('emailError').classList.add('show');
      
      submitBtn.disabled = false;
      submitBtn.textContent = 'Register Account';
      
      alert('⚠️ This email is already registered. Please use a different email.');
    } else {
      // Email doesn't exist - proceed with registration
      registerUser(name, email, phone);
    }
  })
  .catch(error => {
    console.error('Error checking email:', error);
    alert('Error checking email. Please try again.');
    
    submitBtn.disabled = false;
    submitBtn.textContent = 'Register Account';
  });
}

// Function to register user using Axios POST
function registerUser(name, email, phone) {
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.textContent = 'Registering...';
  
  // Get current date
  const today = new Date().toISOString().split('T')[0];
  
  // Prepare user data
  const userData = {
    name: name,
    email: email,
    phone: phone,
    registeredAt: today
  };
  
  // Axios POST request
  axios.post(API_URL, userData)
    .then(response => {
      console.log('User registered successfully:', response.data);
      
      // Show success message
      document.getElementById('successMessage').classList.add('show');
      
      // Reset form
      document.getElementById('registrationForm').reset();
      document.getElementById('email').classList.remove('success', 'error');
      
      // Reload users list
      loadExistingUsers();
      
      // Hide success message after 5 seconds
      setTimeout(function() {
        document.getElementById('successMessage').classList.remove('show');
      }, 5000);
      
      submitBtn.disabled = false;
      submitBtn.textContent = 'Register Account';
    })
    .catch(error => {
      console.error('Error registering user:', error);
      alert('Error registering user. Please try again.');
      
      submitBtn.disabled = false;
      submitBtn.textContent = 'Register Account';
    });
}

// Function to load existing users
function loadExistingUsers() {
  const usersList = document.getElementById('usersList');
  usersList.innerHTML = '<div class="users-header">Loading users...</div>';
  
  // Axios GET request to fetch all users
  axios.get(API_URL)
    .then(response => {
      const users = response.data;
      
      if (users.length === 0) {
        usersList.innerHTML = '<div class="users-header">No users registered yet</div>';
        return;
      }
      
      usersList.innerHTML = `<div class="users-header">${users.length} Registered User${users.length !== 1 ? 's' : ''}</div>`;
      
      users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        userItem.innerHTML = `
          <div class="user-name">${user.name}</div>
          <div class="user-email">📧 ${user.email}</div>
        `;
        usersList.appendChild(userItem);
      });
    })
    .catch(error => {
      console.error('Error loading users:', error);
      usersList.innerHTML = '<div class="users-header">Error loading users</div>';
    });
}
