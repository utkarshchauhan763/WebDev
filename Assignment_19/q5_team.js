// Q5 - Team Members Directory
$(document).ready(function() {
  
  // 1. Click a manager → highlight all direct reports
  $('.member.manager').click(function() {
    // Remove previous highlights
    $('.member').removeClass('highlighted');
    
    // Highlight the clicked manager
    $(this).addClass('highlighted');
    
    // Highlight all sibling employees (direct reports) in the same department
    $(this).siblings('.member[data-role="employee"]').addClass('highlighted');
  });
  
  // 2. Hover on an employee → show contact info using .next()
  $('.member').hover(
    function() {
      // Mouse enter - show contact info
      $(this).find('.contact-info').slideDown(300);
    },
    function() {
      // Mouse leave - hide contact info
      $(this).find('.contact-info').slideUp(300);
    }
  );
  
  // 3. Click on a department → change background of all members using .children()
  $('.department').click(function(e) {
    // Don't trigger if clicking on a member
    if ($(e.target).closest('.member').length) {
      return;
    }
    
    // Toggle highlighted class on department
    $(this).toggleClass('highlighted');
    
    // Change background of all member children
    if ($(this).hasClass('highlighted')) {
      $(this).find('.member').css({
        'background': '#e8eaf6',
        'border': '2px solid #667eea'
      });
    } else {
      // Reset backgrounds
      $(this).find('.member:not(.manager)').css({
        'background': '#f8f9fa',
        'border': 'none'
      });
      $(this).find('.member.manager').css({
        'background': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'border': 'none'
      });
    }
  });
  
  // 4. Select a random employee → highlight sibling employees
  $('#randomEmployee').click(function() {
    // Remove previous highlights
    $('.member').removeClass('highlighted');
    
    // Get all non-manager employees
    const employees = $('.member[data-role="employee"]');
    
    if (employees.length > 0) {
      // Pick a random employee
      const randomIndex = Math.floor(Math.random() * employees.length);
      const randomEmployee = employees.eq(randomIndex);
      
      // Highlight the random employee
      randomEmployee.addClass('highlighted');
      
      // Highlight all siblings (other members in same department)
      randomEmployee.siblings('.member').addClass('highlighted');
      
      // Scroll to the selected employee
      $('html, body').animate({
        scrollTop: randomEmployee.offset().top - 100
      }, 500);
    }
  });
  
  // 5. Collapse/expand team using .parent() and .find()
  $('#collapseAll').click(function() {
    // For each department, hide all members except the header
    $('.department').each(function() {
      // Find all members within this department and hide them
      $(this).find('.member').slideUp(400);
    });
  });
  
  $('#expandAll').click(function() {
    // For each department, show all members
    $('.department').each(function() {
      // Find all members within this department and show them
      $(this).find('.member').slideDown(400);
    });
  });
  
  // Additional: Click department header to toggle that department's members
  $('.dept-header').click(function(e) {
    e.stopPropagation();
    
    // Get parent department and find all its member children
    $(this).parent('.department').find('.member').slideToggle(400);
  });
  
});
