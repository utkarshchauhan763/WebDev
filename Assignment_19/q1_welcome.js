// Q1 - Welcome Page Greeting
$(document).ready(function() {
  
  // 1. Display personalized greeting based on time of day
  function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    let greeting = "";
    
    if (hour < 12) {
      greeting = "☀️ Good Morning!";
    } else if (hour < 18) {
      greeting = "🌤️ Good Afternoon!";
    } else {
      greeting = "🌙 Good Evening!";
    }
    
    return greeting;
  }
  
  // Set initial greeting on page load
  $('#greeting').text(getTimeBasedGreeting());
  
  // Motivational quotes array
  const quotes = [
    "💪 Believe in yourself and you will be unstoppable!",
    "🚀 The only way to do great work is to love what you do.",
    "✨ Dream big, work hard, stay focused!",
    "🎯 Success is not final, failure is not fatal.",
    "🌟 Your limitation—it's only your imagination!"
  ];
  
  let quoteIndex = 0;
  
  // 2. Button "Change Greeting" → changes text to a motivational quote
  $('#changeGreeting').click(function() {
    $('#greeting').text(quotes[quoteIndex]);
    quoteIndex = (quoteIndex + 1) % quotes.length;
  });
  
  // 3. Toggle visibility of welcome message using another button
  $('#toggleMessage').click(function() {
    $('#welcomeMessage').slideToggle(400);
    
    // Update button text based on visibility
    if ($('#welcomeMessage').is(':visible')) {
      $(this).html('<span class="icon">👁️</span> Toggle Welcome');
    } else {
      $(this).html('<span class="icon">👁️</span> Show Welcome');
    }
  });
  
  // 4. Show alert when greeting is clicked
  $('#greeting').click(function() {
    const currentText = $(this).text();
    alert('You clicked on: ' + currentText);
  });
  
});
