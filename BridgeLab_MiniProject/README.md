# Student Result Management System

A simple React application for managing student data with CRUD operations using JSON Server as the backend.

## Features

- **Add Student** - Add new students with name, section, marks, and grade
- **View Students** - Display all students in a table format
- **Edit Student** - Update existing student information
- **Delete Student** - Remove students from the database
- **View Details** - See detailed information of individual students

## Technologies Used

- React (with useState for state management)
- JSON Server (REST API backend)
- Fetch API (for CRUD operations)
- Vite (build tool)

## Project Structure

```
student-result-app/
│
├── db.json                      → JSON Server database
├── src/
│   ├── components/
│   │   ├── StudentList.jsx      → Display all students
│   │   ├── StudentForm.jsx      → Add/Edit form
│   │   └── StudentDetails.jsx   → View student details
│   ├── services/
│   │   └── studentService.js    → API calls (CRUD)
│   └── App.jsx                  → Main component
└── package.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start JSON Server (Terminal 1)

```bash
npm run server
```

This will start the JSON Server on `http://localhost:3000`

### 3. Start React App (Terminal 2)

```bash
npm run dev
```

This will start the React app (usually on `http://localhost:5173`)

## How to Use

1. **Load Students** - Click the "Load Students" button to fetch all students from the server
2. **Add Student** - Click "Add Student", fill the form, and submit
3. **Edit Student** - Click "Edit" button next to any student, modify the data, and save
4. **Delete Student** - Click "Delete" button to remove a student (confirmation required)
5. **View Details** - Click "View" to see complete information of a student

## API Endpoints (JSON Server)

- `GET /students` - Get all students
- `GET /students/:id` - Get single student
- `POST /students` - Add new student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student

## Notes

- Make sure JSON Server is running before using the app
- After any add/edit/delete operation, click "Load Students" to refresh the data
- All data is stored in `db.json` file
- The app uses only `useState` for state management (no useEffect)

## Sample Student Data

```json
{
  "name": "John Doe",
  "section": "A",
  "marks": 85,
  "grade": "A"
}
```
