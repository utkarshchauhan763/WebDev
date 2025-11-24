// Q4 - Special Offer Banner
$(document).ready(function() {
  
  let autoRotateInterval = null;
  let isAutoRotating = false;
  
  // 1. "Hide" button → hide specific banners (clicking × button on banner)
  $('.close-btn').click(function(e) {
    e.stopPropagation();
    $(this).closest('.banner').hide(400);
  });
  
  // Hide all button
  $('#hideBtn').click(function() {
    $('.banner').hide(400);
  });
  
  // 2. "Show" button → show hidden banners
  $('#showBtn').click(function() {
    $('.banner').show(400);
  });
  
  // 3. "Slide Up/Down" buttons → toggle banners with slide effect
  $('#slideBtn').click(function() {
    $('.banner').slideToggle(600);
  });
  
  // 4. "Fade In/Fade Out" → show/hide banners gradually
  $('#fadeBtn').click(function() {
    $('.banner').each(function(index) {
      // Stagger the fade effect for each banner
      $(this).delay(index * 100).fadeToggle(600);
    });
  });
  
  // 5. Automatically rotate through banners every 5 seconds using .fadeIn()/.fadeOut()
  $('#autoRotateBtn').click(function() {
    if (isAutoRotating) {
      // Stop auto rotation
      clearInterval(autoRotateInterval);
      isAutoRotating = false;
      $(this).text('🔄 Auto Rotate');
      $('#rotateIndicator').removeClass('active').text('Auto-rotation: OFF');
      
      // Show all banners
      $('.banner').fadeIn(400);
    } else {
      // Start auto rotation
      isAutoRotating = true;
      $(this).text('⏸️ Stop Rotation');
      $('#rotateIndicator').addClass('active').text('Auto-rotation: ON • Rotating every 5 seconds');
      
      // Get all banners
      const banners = $('.banner');
      let currentIndex = 0;
      
      // Hide all except first
      banners.not(':first').hide();
      
      // Rotate function
      autoRotateInterval = setInterval(function() {
        // Fade out current banner
        $(banners[currentIndex]).fadeOut(800, function() {
          // Move to next banner
          currentIndex = (currentIndex + 1) % banners.length;
          
          // Fade in next banner
          $(banners[currentIndex]).fadeIn(800);
        });
      }, 5000); // 5 seconds interval
    }
  });
  
  // Click banner to show alert
  $('.banner').click(function(e) {
    if (!$(e.target).hasClass('close-btn')) {
      const offerText = $(this).find('.banner-text').text();
      alert('🎉 ' + offerText);
    }
  });
  
});
