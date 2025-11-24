// Q5 - College Timetable Viewer using Fetch API

const API_URL = 'http://localhost:3005/timetable';

// Load timetable for Monday on page load
window.addEventListener('DOMContentLoaded', function() {
  loadTimetable('Monday');
});

// Day selector change event
document.getElementById('daySelect').addEventListener('change', function() {
  const selectedDay = this.value;
  loadTimetable(selectedDay);
});

// Function to load timetable for selected day
function loadTimetable(day) {
  // Show loading indicator
  document.getElementById('loadingIndicator').style.display = 'block';
  document.getElementById('timetableList').innerHTML = '';
  document.getElementById('dayInfo').style.display = 'none';

  // Fetch timetable with query parameter
  fetch(`${API_URL}?day=${encodeURIComponent(day)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(classes => {
      // Hide loading indicator
      document.getElementById('loadingIndicator').style.display = 'none';

      // Check if classes found
      if (classes.length === 0) {
        showNoClasses(day);
      } else {
        displayTimetable(classes, day);
      }
    })
    .catch(error => {
      console.error('Error loading timetable:', error);
      
      // Hide loading indicator
      document.getElementById('loadingIndicator').style.display = 'none';
      
      // Show error message
      document.getElementById('timetableList').innerHTML = `
        <div class="no-classes">
          <div class="no-classes-icon">⚠️</div>
          <div class="no-classes-text">Error loading timetable</div>
          <div class="no-classes-subtitle">${error.message}</div>
          <div style="margin-top: 20px; font-size: 14px;">
            Please ensure JSON Server is running on port 3005
          </div>
        </div>
      `;
    });
}

// Function to display timetable
function displayTimetable(classes, day) {
  const timetableList = document.getElementById('timetableList');
  timetableList.innerHTML = '';

  // Show day info
  document.getElementById('dayInfo').style.display = 'block';
  document.getElementById('dayName').textContent = day;
  document.getElementById('classCount').textContent = 
    `${classes.length} class${classes.length !== 1 ? 'es' : ''} scheduled`;

  // Create class cards
  classes.forEach(classItem => {
    const card = createClassCard(classItem);
    timetableList.appendChild(card);
  });
}

// Function to create a class card
function createClassCard(classItem) {
  const card = document.createElement('div');
  card.className = 'class-card';
  
  card.innerHTML = `
    <div class="class-header">
      <div class="subject-name">${classItem.subject}</div>
      <div class="time-badge">⏰ ${classItem.time}</div>
    </div>
    <div class="class-details">
      <div class="detail-item">
        <span class="detail-icon">👨‍🏫</span>
        <span><strong>Faculty:</strong> ${classItem.faculty}</span>
      </div>
      <div class="detail-item">
        <span class="detail-icon">🚪</span>
        <span><strong>Room:</strong> ${classItem.room}</span>
      </div>
    </div>
  `;
  
  return card;
}

// Function to show no classes message
function showNoClasses(day) {
  document.getElementById('dayInfo').style.display = 'block';
  document.getElementById('dayName').textContent = day;
  document.getElementById('classCount').textContent = 'No classes scheduled';

  document.getElementById('timetableList').innerHTML = `
    <div class="no-classes">
      <div class="no-classes-icon">🎉</div>
      <div class="no-classes-text">No classes today</div>
      <div class="no-classes-subtitle">Enjoy your free day!</div>
    </div>
  `;
}
