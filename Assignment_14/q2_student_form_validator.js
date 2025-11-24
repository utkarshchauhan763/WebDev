/**
 * Assignment 14 - Q2: Student Form Validator
 * Forms + RegExp validation
 */

"use strict";

console.log("=== Q2: Student Form Validator ===");

// RegExp patterns for validation
const validationPatterns = {
    // Name: only alphabets and spaces
    name: /^[A-Za-z\s]+$/,
    
    // Email: basic email format validation
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    
    // Phone: exactly 10 digits
    phone: /^\d{10}$/,
    
    // Password: at least 1 uppercase, 1 number, 1 special character, minimum 8 chars
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

// Validation messages
const errorMessages = {
    name: "Name should contain only alphabets and spaces",
    email: "Please enter a valid email address (example@domain.com)",
    phone: "Phone number must be exactly 10 digits",
    password: "Password must contain at least 1 uppercase letter, 1 number, and 1 special character (@$!%*?&)"
};

// Form elements
const form = document.getElementById('studentForm');
const submitBtn = document.getElementById('submitBtn');
const result = document.getElementById('result');

// Input fields
const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    password: document.getElementById('password')
};

// Validation state
let validationState = {
    name: false,
    email: false,
    phone: false,
    password: false
};

/**
 * Validate individual field using RegExp
 * @param {string} fieldName - Name of the field to validate
 * @param {string} value - Value to validate
 * @returns {boolean} - True if valid, false if invalid
 */
function validateField(fieldName, value) {
    const pattern = validationPatterns[fieldName];
    return pattern.test(value);
}

/**
 * Show validation result for a field
 * @param {string} fieldName - Name of the field
 * @param {boolean} isValid - Whether the field is valid
 */
function showValidationResult(fieldName, isValid) {
    const input = fields[fieldName];
    const errorElement = document.getElementById(`${fieldName}Error`);
    const successElement = document.getElementById(`${fieldName}Success`);

    // Reset classes
    input.classList.remove('valid', 'invalid');
    
    if (isValid) {
        // Show success state
        input.classList.add('valid');
        errorElement.style.display = 'none';
        successElement.style.display = 'block';
        validationState[fieldName] = true;
    } else {
        // Show error state
        input.classList.add('invalid');
        errorElement.textContent = errorMessages[fieldName];
        errorElement.style.display = 'block';
        successElement.style.display = 'none';
        validationState[fieldName] = false;
    }
    
    // Update submit button state
    updateSubmitButton();
}

/**
 * Update submit button based on validation state
 */
function updateSubmitButton() {
    const allValid = Object.values(validationState).every(state => state === true);
    submitBtn.disabled = !allValid;
    
    if (allValid) {
        console.log("✅ All fields are valid - form can be submitted");
    }
}

/**
 * Handle real-time validation on input
 * @param {Event} event - Input event
 */
function handleInput(event) {
    const fieldName = event.target.name;
    const value = event.target.value.trim();
    
    // Only validate if field has content
    if (value.length > 0) {
        const isValid = validateField(fieldName, value);
        showValidationResult(fieldName, isValid);
        
        console.log(`Validating ${fieldName}: "${value}" -> ${isValid ? 'Valid' : 'Invalid'}`);
    } else {
        // Reset field if empty
        event.target.classList.remove('valid', 'invalid');
        document.getElementById(`${fieldName}Error`).style.display = 'none';
        document.getElementById(`${fieldName}Success`).style.display = 'none';
        validationState[fieldName] = false;
        updateSubmitButton();
    }
}

/**
 * Handle form submission
 * @param {Event} event - Submit event
 */
function handleSubmit(event) {
    event.preventDefault();
    
    // Get all form values
    const formData = {
        name: fields.name.value.trim(),
        email: fields.email.value.trim(),
        phone: fields.phone.value.trim(),
        password: fields.password.value
    };
    
    console.log("📝 Form submitted with data:", formData);
    
    // Validate all fields one final time
    let allValid = true;
    for (const [fieldName, value] of Object.entries(formData)) {
        const isValid = validateField(fieldName, value);
        if (!isValid) {
            allValid = false;
            showValidationResult(fieldName, false);
        }
    }
    
    if (allValid) {
        // Show success message
        result.className = 'form-result success';
        result.innerHTML = `
            <h3>✅ Registration Successful!</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p>Password saved securely ✓</p>
        `;
        result.style.display = 'block';
        
        console.log("🎉 Student registered successfully!");
        
        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            result.style.display = 'none';
            // Reset validation states
            Object.keys(validationState).forEach(field => {
                fields[field].classList.remove('valid', 'invalid');
                document.getElementById(`${field}Error`).style.display = 'none';
                document.getElementById(`${field}Success`).style.display = 'none';
                validationState[field] = false;
            });
            updateSubmitButton();
        }, 3000);
        
    } else {
        console.log("❌ Form submission failed - validation errors");
    }
}

// Event listeners for real-time validation
Object.values(fields).forEach(field => {
    field.addEventListener('input', handleInput);
    field.addEventListener('blur', handleInput); // Also validate on blur
});

// Form submission listener
form.addEventListener('submit', handleSubmit);

console.log("✅ Form validation initialized with RegExp patterns:");
console.log("- Name: Alphabets and spaces only");
console.log("- Email: Valid email format");
console.log("- Phone: Exactly 10 digits");
console.log("- Password: 1 uppercase, 1 number, 1 special character");