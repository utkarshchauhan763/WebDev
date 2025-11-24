# Assignment 18 - DOM Manipulation & Event Handling

## 📚 Overview
This assignment demonstrates advanced DOM manipulation, event handling, and interactive UI patterns using vanilla JavaScript (ES6+). All examples are browser-based and use HTML, CSS, and core JavaScript without any frameworks.

## 📁 Files Structure

### Q1 - Dynamic Product List Manager (`q1_product_list.html`)
**Concepts:** Event Delegation, Inline Editing, contentEditable
- ✅ Add products dynamically
- ✅ Edit products inline (click outside to auto-save)
- ✅ Delete products with confirmation
- ✅ Event delegation on parent `<ul>` element

**Key Features:**
- Event delegation pattern
- contentEditable for inline editing
- Auto-save on blur (clicking outside)

---

### Q2 - Live Character Counter (`q2_character_counter.html`)
**Concepts:** input event, preventDefault(), Real-time validation
- ✅ Live character counter (max 100)
- ✅ Warning behavior (yellow at 20 chars left)
- ✅ Danger state (red at 0)
- ✅ Typing blocked at limit using preventDefault()
- ✅ Reset button

**Key Features:**
- Real-time `input` event listener
- `keydown` + `preventDefault()` to block typing
- Dynamic CSS class switching

---

### Q3 - Multi-Step Form (`q3_multistep_form.html`)
**Concepts:** Form validation, Step-by-step navigation, State management
- ✅ 3-step form (Name → Email → Password)
- ✅ Validation before proceeding to next step
- ✅ Back/Next navigation
- ✅ Final summary display
- ✅ Progress bar visualization

**Key Features:**
- Step-based validation logic
- Dynamic step rendering
- Form state persistence

---

### Q4 - Theme Switcher (`q4_theme_switcher.html`)
**Concepts:** setAttribute(), data-* attributes, Dynamic styling
- ✅ 3 themes: Light, Dark, Blue
- ✅ Applied using `setAttribute()` on `<body>`
- ✅ Custom attribute: `data-theme="dark"`
- ✅ Theme persistence with localStorage

**Key Features:**
- `body.setAttribute("data-theme", value)`
- CSS attribute selectors `[data-theme="dark"]`
- LocalStorage integration

---

### Q5 - Image Gallery with Modal (`q5_image_gallery.html`)
**Concepts:** Modal pattern, stopPropagation(), Event bubbling
- ✅ 6-image gallery grid
- ✅ Click to open modal with larger image
- ✅ Click outside modal to close
- ✅ `event.stopPropagation()` prevents modal close when clicking inside
- ✅ Close button and ESC key support

**Key Features:**
- Modal overlay with backdrop
- Event propagation control
- Dynamic image source switching

---

### Q6 - Real-Time Table Filter (`q6_table_filter.html`)
**Concepts:** input event, Array filtering, Case-insensitive search
- ✅ Student table (Name, Branch, CGPA)
- ✅ Real-time filtering on input
- ✅ Case-insensitive search
- ✅ "No results found" message

**Key Features:**
- `input` event for live search
- `textContent` search across all columns
- Dynamic row visibility toggling

---

### Q7 - Mouse Path & Coordinates Logger (`q7_mouse_tracker.html`)
**Concepts:** mousemove, dblclick, clientX/clientY
- ✅ 400×400 tracking box
- ✅ Live coordinate display (clientX, clientY)
- ✅ Double-click drops a red dot at position
- ✅ Clear dots button

**Key Features:**
- `mousemove` event tracking
- `getBoundingClientRect()` for relative positioning
- Dynamic dot creation on double-click

---

### Q8 - Custom Dropdown (`q8_custom_dropdown.html`)
**Concepts:** Capturing phase, stopPropagation(), Custom UI components
- ✅ Custom dropdown (no `<select>` tag)
- ✅ Show/hide on button click
- ✅ Click option to update button text
- ✅ Click outside to close (using capturing phase)

**Key Features:**
- Event capturing: `addEventListener(..., true)`
- `stopPropagation()` to prevent bubbling
- Custom dropdown state management

---

### Q9 - Form Validation with preventDefault (`q9_form_validation.html`)
**Concepts:** preventDefault(), Real-time validation, Error messaging
- ✅ 3 fields: Name, Email, Password
- ✅ Inline error messages
- ✅ `preventDefault()` blocks invalid submission
- ✅ Errors disappear automatically on correction
- ✅ Success modal on valid submission

**Key Features:**
- Form `submit` event + `preventDefault()`
- Real-time `input` event validation
- Dynamic error state management
- Success modal with overlay

---

## 🚀 How to Run

### Method 1: Open Directly in Browser
1. Navigate to `Assignment_18` folder
2. Double-click any `.html` file
3. File opens in default browser

### Method 2: Using VS Code Live Server (Recommended)
1. Install "Live Server" extension in VS Code
2. Right-click any `.html` file
3. Select "Open with Live Server"
4. Browser auto-refreshes on file changes

### Method 3: Using PowerShell
```powershell
# Navigate to Assignment_18 folder
cd Assignment_18

# Open specific file
Start-Process "q1_product_list.html"

# Or open all files at once
Get-ChildItem *.html | ForEach-Object { Start-Process $_.FullName }
```

---

## 🎯 Key Concepts Demonstrated

### Event Handling
- ✅ Event delegation (`q1`)
- ✅ Event capturing vs bubbling (`q8`)
- ✅ `stopPropagation()` (`q5`, `q8`)
- ✅ `preventDefault()` (`q2`, `q9`)

### DOM Manipulation
- ✅ Dynamic element creation
- ✅ `setAttribute()` / `getAttribute()` (`q4`)
- ✅ `contentEditable` (`q1`)
- ✅ Class list manipulation
- ✅ `dataset` attributes

### Event Types
- ✅ `click`, `dblclick`
- ✅ `input`, `keydown`, `submit`
- ✅ `mousemove`, `mouseleave`
- ✅ `blur`, `focus`

### Real-time Validation
- ✅ Input validation (`q2`, `q9`)
- ✅ Live search/filter (`q6`)
- ✅ Character counting (`q2`)

### UI Patterns
- ✅ Modal/Overlay (`q5`, `q9`)
- ✅ Custom dropdown (`q8`)
- ✅ Multi-step wizard (`q3`)
- ✅ Theme switching (`q4`)

---

## 💡 Testing Tips

### Q1 (Product List)
- Add multiple products
- Edit one, then click outside to save
- Try editing and pressing Enter
- Delete with confirmation dialog

### Q2 (Character Counter)
- Type until warning (80 chars)
- Type until limit (100 chars)
- Try typing more (should be blocked)
- Test reset button

### Q3 (Multi-Step Form)
- Try clicking Next with empty fields
- Enter invalid email (no @)
- Use short password (<6 chars)
- Complete all steps to see summary

### Q4 (Theme Switcher)
- Switch between themes
- Refresh page (theme should persist)
- Inspect body element to see data-theme attribute

### Q5 (Image Gallery)
- Click any image to open modal
- Click outside image to close
- Click on image itself (should NOT close)
- Try ESC key to close

### Q6 (Table Filter)
- Search "Computer" (finds branch)
- Search "9" (finds CGPAs)
- Search "xyz" (shows no results)
- Clear search to see all

### Q7 (Mouse Tracker)
- Move mouse to see coordinates
- Double-click multiple times
- Move mouse out of box (coordinates reset)
- Clear all dots

### Q8 (Custom Dropdown)
- Click button to open
- Click outside to close
- Select an option
- Try ESC key to close

### Q9 (Form Validation)
- Submit empty form (see errors)
- Fix errors one by one (errors disappear)
- Submit valid form (success modal)
- Close modal (form resets)

---

## 🛠️ Browser Compatibility
All examples work in modern browsers:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari

---

## 📝 Notes
- All files are standalone (no dependencies)
- Styled with modern gradients and animations
- Fully responsive layouts
- Commented code for learning
- ES6+ JavaScript (`"use strict"`)

---

## 🎓 Learning Outcomes
After completing this assignment, you will understand:
1. Advanced event handling patterns
2. Event propagation (capturing vs bubbling)
3. Real-time form validation
4. DOM manipulation best practices
5. Building custom UI components
6. State management in vanilla JS
7. Accessibility considerations

---

## 📧 Questions?
Review the inline comments in each `.html` file for detailed explanations of the logic and patterns used.

Happy coding! 🚀
