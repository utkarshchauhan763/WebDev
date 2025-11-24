/**
 * Assignment 14 - Q4: Custom Form Builder
 * Forms + Classes for dynamic form generation
 */

"use strict";

console.log("=== Q4: Custom Form Builder ===");

// FormBuilder class for dynamic form generation
class FormBuilder {
    constructor() {
        this.fields = [];
        this.formContainer = document.getElementById('dynamicForm');
        this.fieldConfig = document.getElementById('fieldConfig');
        this.formDataDisplay = document.getElementById('formDataDisplay');
    }

    /**
     * Show field configuration panel
     */
    showFieldConfig() {
        this.fieldConfig.classList.add('active');
        document.getElementById('fieldLabel').focus();
    }

    /**
     * Hide field configuration panel
     */
    hideFieldConfig() {
        this.fieldConfig.classList.remove('active');
        this.clearFieldConfig();
    }

    /**
     * Clear field configuration inputs
     */
    clearFieldConfig() {
        document.getElementById('fieldType').value = 'text';
        document.getElementById('fieldLabel').value = '';
        document.getElementById('fieldName').value = '';
        document.getElementById('fieldPlaceholder').value = '';
        document.getElementById('fieldOptions').value = '';
    }

    /**
     * Add a new field to the form configuration
     */
    addField() {
        const type = document.getElementById('fieldType').value;
        const label = document.getElementById('fieldLabel').value.trim();
        const name = document.getElementById('fieldName').value.trim();
        const placeholder = document.getElementById('fieldPlaceholder').value.trim();
        const options = document.getElementById('fieldOptions').value.trim();

        // Validation
        if (!label || !name) {
            alert('Please provide both label and field name!');
            return;
        }

        // Check for duplicate field names
        if (this.fields.some(field => field.name === name)) {
            alert('Field name must be unique!');
            return;
        }

        // Create field object
        const fieldConfig = {
            type,
            label,
            name,
            placeholder,
            options: options ? options.split(',').map(opt => opt.trim()) : [],
            required: true
        };

        this.fields.push(fieldConfig);
        
        console.log(`➕ Added field: ${label} (${type})`);
        console.log('Current fields:', this.fields);

        // Clear and hide config
        this.clearFieldConfig();
        this.hideFieldConfig();

        // Auto-generate form if we have fields
        if (this.fields.length > 0) {
            this.generateForm();
        }
    }

    /**
     * Generate HTML for different field types
     * @param {Object} field - Field configuration object
     * @returns {string} - HTML string for the field
     */
    generateFieldHTML(field) {
        let html = `<div class="form-field">`;
        html += `<label for="${field.name}">${field.label}${field.required ? ' *' : ''}</label>`;

        switch (field.type) {
            case 'textarea':
                html += `<textarea id="${field.name}" name="${field.name}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}></textarea>`;
                break;

            case 'select':
                html += `<select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>`;
                html += `<option value="">Choose ${field.label}</option>`;
                field.options.forEach(option => {
                    html += `<option value="${option}">${option}</option>`;
                });
                html += `</select>`;
                break;

            case 'radio':
                field.options.forEach((option, index) => {
                    html += `
                        <div style="margin: 0.5rem 0;">
                            <input type="radio" id="${field.name}_${index}" name="${field.name}" value="${option}" ${field.required && index === 0 ? 'required' : ''}>
                            <label for="${field.name}_${index}" style="margin-left: 0.5rem; font-weight: normal;">${option}</label>
                        </div>
                    `;
                });
                break;

            case 'checkbox':
                html += `<input type="checkbox" id="${field.name}" name="${field.name}" value="true">`;
                html += `<label for="${field.name}" style="margin-left: 0.5rem; font-weight: normal;">I agree</label>`;
                break;

            default:
                html += `<input type="${field.type}" id="${field.name}" name="${field.name}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>`;
        }

        html += `</div>`;
        return html;
    }

    /**
     * Generate the complete form using innerHTML
     */
    generateForm() {
        if (this.fields.length === 0) {
            this.formContainer.innerHTML = `
                <div class="placeholder-text">
                    No fields added yet.<br>
                    Use "Add Field" to create form fields.
                </div>
            `;
            return;
        }

        let formHTML = '<form id="generatedForm" class="generated-form">';
        formHTML += '<h3>🖱️ Generated Form</h3>';

        // Generate HTML for each field
        this.fields.forEach(field => {
            formHTML += this.generateFieldHTML(field);
        });

        // Add submit button
        formHTML += `
            <button type="submit" class="submit-btn">Submit Form</button>
        </form>
        `;

        this.formContainer.innerHTML = formHTML;
        this.formContainer.classList.add('generated-form');

        // Add submit event listener
        const form = document.getElementById('generatedForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.getFormData();
        });

        console.log(`✅ Generated form with ${this.fields.length} fields`);
    }

    /**
     * Get all form data as an object when submit is clicked
     * @returns {Object} - Object containing all form values
     */
    getFormData() {
        const form = document.getElementById('generatedForm');
        if (!form) {
            console.log('❌ No form generated yet');
            alert('Please generate a form first!');
            return {};
        }

        const formData = {};

        this.fields.forEach(field => {
            const fieldName = field.name;

            if (field.type === 'radio') {
                const selectedRadio = form.querySelector(`input[name="${fieldName}"]:checked`);
                formData[fieldName] = selectedRadio ? selectedRadio.value : '';
            } else if (field.type === 'checkbox') {
                const checkbox = form.querySelector(`input[name="${fieldName}"]`);
                formData[fieldName] = checkbox ? checkbox.checked : false;
            } else {
                const fieldElement = form.querySelector(`[name="${fieldName}"]`);
                formData[fieldName] = fieldElement ? fieldElement.value : '';
            }
        });

        console.log('📊 Form Data Retrieved:', formData);

        // Display form data
        this.displayFormData(formData);

        return formData;
    }

    /**
     * Display form data in a formatted way
     * @param {Object} data - Form data object
     */
    displayFormData(data) {
        let display = `📊 Form Data:\n\n`;
        display += JSON.stringify(data, null, 2);

        this.formDataDisplay.innerHTML = `<div class="form-data">${display}</div>`;

        // Also show in a more user-friendly format
        let userFriendly = `\n\n📋 User-Friendly Format:\n\n`;
        for (const [key, value] of Object.entries(data)) {
            const field = this.fields.find(f => f.name === key);
            const label = field ? field.label : key;
            userFriendly += `${label}: ${value}\n`;
        }

        this.formDataDisplay.innerHTML += `<div class="form-data">${userFriendly}</div>`;
    }

    /**
     * Clear all fields and reset form
     */
    clearForm() {
        if (confirm('Are you sure you want to clear all fields?')) {
            this.fields = [];
            this.formContainer.innerHTML = `
                <div class="placeholder-text">
                    Your dynamic form will appear here.<br>
                    Add fields using the controls above and click "Generate Form".
                </div>
            `;
            this.formContainer.classList.remove('generated-form');
            this.formDataDisplay.innerHTML = '';
            this.hideFieldConfig();
            
            console.log('🗑️ Form cleared');
        }
    }

    /**
     * Get current form configuration
     * @returns {Array} - Array of field configurations
     */
    getFormConfig() {
        return this.fields;
    }
}

// Initialize FormBuilder
const formBuilder = new FormBuilder();

console.log('✅ Custom Form Builder initialized');
console.log('Available methods:');
console.log('- formBuilder.addField() - Add new field to form');
console.log('- formBuilder.generateForm() - Generate HTML form');
console.log('- formBuilder.getFormData() - Get all form values');
console.log('- formBuilder.clearForm() - Clear all fields');

// Demo: Auto-add some sample fields for testing
setTimeout(() => {
    console.log('\n🎯 Adding sample fields for demonstration...');
    
    // Add sample fields programmatically
    formBuilder.fields.push(
        { type: 'text', label: 'Full Name', name: 'fullName', placeholder: 'Enter your full name', options: [], required: true },
        { type: 'email', label: 'Email', name: 'email', placeholder: 'your@email.com', options: [], required: true },
        { type: 'select', label: 'Department', name: 'department', placeholder: '', options: ['HR', 'IT', 'Marketing', 'Sales'], required: true }
    );
    
    console.log('Sample fields added. Click "Generate Form" to see them.');
}, 1000);