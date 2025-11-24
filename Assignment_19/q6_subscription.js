// Q6 - Event Subscription Panel
$(document).ready(function() {
  
  // Function to show success message
  function showMessage(text) {
    const message = $('<div class="success-message"></div>').text(text);
    $('#messageContainer').html(message);
    
    // Auto-hide after 3 seconds
    setTimeout(function() {
      message.fadeOut(400, function() {
        $(this).remove();
      });
    }, 3000);
  }
  
  // 1. Subscribe → enable notifications
  // Using event delegation with .on() for dynamically added elements
  $('#subscriptions').on('click', '.subscribe-btn', function() {
    const item = $(this).closest('.subscription-item');
    const topicName = item.find('.topic-name').text();
    
    // Update UI
    item.addClass('subscribed').removeClass('unsubscribed');
    item.find('.topic-status').text('✓ Subscribed - Notifications enabled');
    
    // Toggle button visibility
    $(this).hide();
    item.find('.unsubscribe-btn').show();
    
    // Show success message
    showMessage('✅ Successfully subscribed to ' + topicName);
  });
  
  // 2. Unsubscribe → disable notifications
  $('#subscriptions').on('click', '.unsubscribe-btn', function() {
    const item = $(this).closest('.subscription-item');
    const topicName = item.find('.topic-name').text();
    
    // Update UI
    item.addClass('unsubscribed').removeClass('subscribed');
    item.find('.topic-status').text('✗ Unsubscribed - Notifications disabled');
    
    // Toggle button visibility
    $(this).hide();
    item.find('.subscribe-btn').show();
    
    // Show success message
    showMessage('❌ Unsubscribed from ' + topicName);
  });
  
  // 3. Dynamically add new subscription topics → attach .on() click events
  $('#addTopicBtn').click(function() {
    const newTopic = $('#newTopicInput').val().trim();
    
    if (!newTopic) {
      alert('⚠️ Please enter a topic name');
      return;
    }
    
    // Create unique topic ID
    const topicId = newTopic.toLowerCase().replace(/\s+/g, '-');
    
    // Check if topic already exists
    if ($(`[data-topic="${topicId}"]`).length > 0) {
      alert('⚠️ This topic already exists');
      return;
    }
    
    // Create new subscription item HTML
    const newItem = `
      <div class="subscription-item" data-topic="${topicId}">
        <div class="topic-info">
          <div class="topic-name">⭐ ${newTopic}</div>
          <div class="topic-status">Not subscribed</div>
        </div>
        <div class="action-buttons">
          <button class="action-btn subscribe-btn">Subscribe</button>
          <button class="action-btn unsubscribe-btn" style="display:none;">Unsubscribe</button>
          <button class="action-btn remove-btn">Remove</button>
        </div>
      </div>
    `;
    
    // Add to subscriptions container with animation
    const $newItem = $(newItem).hide();
    $('#subscriptions').append($newItem);
    $newItem.slideDown(400);
    
    // Clear input
    $('#newTopicInput').val('');
    
    // Show success message
    showMessage('✅ New topic added: ' + newTopic);
  });
  
  // Allow Enter key to add topic
  $('#newTopicInput').keypress(function(e) {
    if (e.which === 13) {
      $('#addTopicBtn').click();
    }
  });
  
  // 4. Remove specific subscription → detach .off() event
  $('#subscriptions').on('click', '.remove-btn', function() {
    const item = $(this).closest('.subscription-item');
    const topicName = item.find('.topic-name').text();
    
    if (confirm('Are you sure you want to remove ' + topicName + '?')) {
      // Remove all event handlers using .off()
      item.off();
      
      // Remove from DOM with animation
      item.slideUp(400, function() {
        $(this).remove();
      });
      
      // Show success message
      showMessage('🗑️ Removed: ' + topicName);
    }
  });
  
});
