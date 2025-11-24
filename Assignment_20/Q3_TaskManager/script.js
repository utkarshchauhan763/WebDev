// Q3 - Task Manager with Filters using jQuery AJAX

$(document).ready(function() {
  const API_URL = 'http://localhost:3003/tasks';
  let allTasks = [];

  // Load tasks on page load
  loadTasks();

  // Filter dropdown change event
  $('#filterSelect').on('change', function() {
    loadTasks();
  });

  // Function to load tasks with filters
  function loadTasks() {
    const filter = $('#filterSelect').val();
    
    // Show loading indicator
    $('#loadingIndicator').show();
    $('#tasksList').empty();
    $('#statsSection').hide();

    // Build query parameters based on filter
    let queryParams = '';
    
    if (filter === 'low' || filter === 'medium' || filter === 'high') {
      queryParams = `?priority=${filter}`;
    } else if (filter === 'completed') {
      queryParams = '?completed=true';
    } else if (filter === 'pending') {
      queryParams = '?completed=false';
    }
    // 'all' has no query params

    // jQuery AJAX GET request
    $.ajax({
      url: API_URL + queryParams,
      method: 'GET',
      dataType: 'json',
      success: function(tasks) {
        $('#loadingIndicator').hide();
        allTasks = tasks;
        
        if (tasks.length === 0) {
          showNoTasks();
        } else {
          displayTasks(tasks);
          updateStats();
        }
      },
      error: function(xhr, status, error) {
        $('#loadingIndicator').hide();
        $('#tasksList').html(`
          <div class="no-tasks">
            <div class="no-tasks-icon">⚠️</div>
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 10px;">Error loading tasks</div>
            <div style="font-size: 14px;">${error}</div>
          </div>
        `);
      }
    });
  }

  // Function to display tasks
  function displayTasks(tasks) {
    $('#tasksList').empty();
    $('#statsSection').show();

    tasks.forEach(function(task) {
      const taskItem = `
        <div class="task-item ${task.completed ? 'completed' : ''} priority-${task.priority}" id="task-${task.id}">
          <input 
            type="checkbox" 
            class="task-checkbox" 
            ${task.completed ? 'checked' : ''}
            data-task-id="${task.id}"
            data-completed="${task.completed}"
          >
          <div class="task-content">
            <div class="task-title">${task.title}</div>
            <div class="task-meta">
              <span class="priority-badge ${task.priority}">${task.priority}</span>
              <span class="task-status">${task.completed ? '✓ Completed' : '○ Pending'}</span>
            </div>
          </div>
        </div>
      `;
      $('#tasksList').append(taskItem);
    });

    // Attach checkbox event listeners
    $('.task-checkbox').on('change', function() {
      const taskId = $(this).data('task-id');
      const currentCompleted = $(this).data('completed') === true;
      toggleTaskCompletion(taskId, !currentCompleted, $(this));
    });
  }

  // Function to toggle task completion
  function toggleTaskCompletion(taskId, newCompleted, checkboxElement) {
    const taskItem = $(`#task-${taskId}`);
    const oldCompleted = !newCompleted;

    // Optimistically update UI
    if (newCompleted) {
      taskItem.addClass('completed');
      checkboxElement.prop('checked', true);
    } else {
      taskItem.removeClass('completed');
      checkboxElement.prop('checked', false);
    }
    
    checkboxElement.data('completed', newCompleted);
    
    // Update task title and meta
    const taskTitle = taskItem.find('.task-title');
    const taskStatus = taskItem.find('.task-status');
    taskStatus.text(newCompleted ? '✓ Completed' : '○ Pending');

    // Send PATCH request using jQuery AJAX
    $.ajax({
      url: `${API_URL}/${taskId}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify({ completed: newCompleted }),
      success: function(response) {
        console.log(`Task ${taskId} updated successfully`);
        
        // Update stats without reloading
        updateStatsAfterToggle(oldCompleted, newCompleted);
        
        // Update allTasks array
        const task = allTasks.find(t => t.id === taskId);
        if (task) {
          task.completed = newCompleted;
        }
      },
      error: function(xhr, status, error) {
        // Revert UI on error
        alert(`Failed to update task: ${error}`);
        
        if (oldCompleted) {
          taskItem.addClass('completed');
          checkboxElement.prop('checked', true);
        } else {
          taskItem.removeClass('completed');
          checkboxElement.prop('checked', false);
        }
        
        checkboxElement.data('completed', oldCompleted);
        taskStatus.text(oldCompleted ? '✓ Completed' : '○ Pending');
      }
    });
  }

  // Function to update stats after toggle
  function updateStatsAfterToggle(oldCompleted, newCompleted) {
    let completed = parseInt($('#completedTasks').text());
    let pending = parseInt($('#pendingTasks').text());
    
    if (newCompleted && !oldCompleted) {
      completed++;
      pending--;
    } else if (!newCompleted && oldCompleted) {
      completed--;
      pending++;
    }
    
    $('#completedTasks').text(completed);
    $('#pendingTasks').text(pending);
  }

  // Function to update statistics
  function updateStats() {
    const total = allTasks.length;
    const completed = allTasks.filter(t => t.completed).length;
    const pending = total - completed;

    $('#totalTasks').text(total);
    $('#completedTasks').text(completed);
    $('#pendingTasks').text(pending);
  }

  // Function to show no tasks message
  function showNoTasks() {
    const filter = $('#filterSelect').val();
    let message = 'No tasks found';
    
    if (filter === 'completed') {
      message = 'No completed tasks';
    } else if (filter === 'pending') {
      message = 'No pending tasks';
    } else if (filter !== 'all') {
      message = `No ${filter} priority tasks`;
    }

    $('#tasksList').html(`
      <div class="no-tasks">
        <div class="no-tasks-icon">📋</div>
        <div style="font-size: 18px; font-weight: 600;">${message}</div>
      </div>
    `);
  }
});
