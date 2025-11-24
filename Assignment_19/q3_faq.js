// Q3 - Interactive FAQ
$(document).ready(function() {
  
  // 1. Click on a question → toggle answer visibility
  $('.faq-question').click(function() {
    const answer = $(this).next('.faq-answer');
    const icon = $(this).find('.icon');
    
    // Toggle answer visibility with slide effect
    answer.slideToggle(400);
    
    // Toggle active class for icon rotation
    $(this).toggleClass('active');
  });
  
  // 2. Hover → change question color
  // Already handled in CSS with :hover, but we can add jQuery effect too
  $('.faq-question').hover(
    function() {
      // Mouse enter
      $(this).css('transform', 'translateX(5px)');
    },
    function() {
      // Mouse leave
      $(this).css('transform', 'translateX(0)');
    }
  );
  
  // 3. Double-click question → collapse all answers
  $('.faq-question').dblclick(function(e) {
    e.stopPropagation(); // Prevent single click event
    
    // Collapse all answers
    $('.faq-answer').slideUp(400);
    
    // Remove active class from all questions
    $('.faq-question').removeClass('active');
    
    // Show feedback
    $(this).css('background', '#dc3545').css('color', 'white');
    setTimeout(() => {
      $(this).css('background', '').css('color', '');
    }, 500);
  });
  
  // Collapse all button
  $('.collapse-all-btn').click(function() {
    $('.faq-answer').slideUp(400);
    $('.faq-question').removeClass('active');
  });
  
  // 4. Focus on answer input → highlight parent question
  $('.answer-input').focus(function() {
    // Find parent faq-item and add focused class
    $(this).closest('.faq-item').addClass('focused');
  });
  
  // 5. Blur from input → reset background color
  $('.answer-input').blur(function() {
    // Remove focused class from parent faq-item
    $(this).closest('.faq-item').removeClass('focused');
  });
  
});
