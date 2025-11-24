// Q9 - Multi-jQuery Widgets using jQuery.noConflict()

// Using $v1 for jQuery version 1.12.4
// Using $v2 for jQuery version 3.6.0

$v1(document).ready(function() {
  console.log('jQuery v1 ready:', $v1.fn.jquery);
});

$v2(document).ready(function() {
  console.log('jQuery v2 ready:', $v2.fn.jquery);
});

// 1. Version 1 → handles carousel slider rotation
$v1(document).ready(function() {
  let carouselInterval = null;
  let currentSlide = 0;
  const totalSlides = $v1('.carousel-slide').length;
  
  function rotateCarousel() {
    // Hide current slide
    $v1('.carousel-slide').removeClass('active');
    $v1('.carousel-dot').removeClass('active');
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % totalSlides;
    
    // Show next slide
    $v1('.carousel-slide').eq(currentSlide).addClass('active');
    $v1('.carousel-dot').eq(currentSlide).addClass('active');
  }
  
  $v1('#startCarousel').click(function() {
    if (carouselInterval) {
      // Stop rotation
      clearInterval(carouselInterval);
      carouselInterval = null;
      $v1(this).text('▶️ Start Rotation');
    } else {
      // Start rotation
      carouselInterval = setInterval(rotateCarousel, 2000);
      $v1(this).text('⏸️ Stop Rotation');
    }
  });
  
  // Click on dots to jump to slide
  $v1('.carousel-dot').click(function() {
    const index = $v1(this).index();
    currentSlide = index;
    $v1('.carousel-slide').removeClass('active');
    $v1('.carousel-dot').removeClass('active');
    $v1('.carousel-slide').eq(index).addClass('active');
    $v1(this).addClass('active');
  });
});

// 2. Version 2 → manages modal popups for notifications
$v2(document).ready(function() {
  $v2('#showModal').click(function() {
    $v2('#modalOverlay').addClass('show');
  });
  
  $v2('#showMessages').click(function() {
    $v2('#modalOverlay').addClass('show');
    $v2('.modal-content h2').text('💬 Messages');
    $v2('.modal-content p').text('You have 3 new messages waiting in your inbox. This modal is powered by jQuery Version 2!');
  });
  
  $v2('.modal-close, #modalOverlay').click(function(e) {
    if (e.target === this) {
      $v2('#modalOverlay').removeClass('show');
    }
  });
});

// 3. Version 1 → highlights active widget
$v1(document).ready(function() {
  $v1('#highlightWidget').click(function() {
    // Remove active from all
    $v1('.widget').removeClass('active');
    
    // Add active to clicked widget
    $v1(this).closest('.widget').addClass('active');
    
    // Update info box
    $v1('#infoBox').text('✨ Active widget highlighted using jQuery v1');
    setTimeout(function() {
      $v1('#infoBox').text('🔄 jQuery Version 1 (carousel) & Version 2 (modals/tooltips) running simultaneously');
    }, 3000);
  });
  
  // Click any widget to highlight it
  $v1('.widget').click(function() {
    $v1('.widget').removeClass('active');
    $v1(this).addClass('active');
  });
});

// 4. Version 2 → attaches tooltips on hover
$v2(document).ready(function() {
  $v2('.has-tooltip').hover(
    function() {
      // Mouse enter - show tooltip
      const tooltipText = $v2(this).data('tooltip');
      if (!tooltipText) return;
      
      const tooltip = $v2('<div class="tooltip"></div>').text(tooltipText);
      $v2('body').append(tooltip);
      
      const offset = $v2(this).offset();
      const width = $v2(this).outerWidth();
      
      tooltip.css({
        top: offset.top - tooltip.outerHeight() - 10,
        left: offset.left + (width / 2) - (tooltip.outerWidth() / 2),
        display: 'block'
      });
      
      // Store tooltip reference
      $v2(this).data('tooltip-element', tooltip);
    },
    function() {
      // Mouse leave - remove tooltip
      const tooltip = $v2(this).data('tooltip-element');
      if (tooltip) {
        tooltip.remove();
        $v2(this).removeData('tooltip-element');
      }
    }
  );
});

// 5. Demonstrate both versions working simultaneously
$v1(document).ready(function() {
  console.log('jQuery v1 managing carousel and widget highlights');
});

$v2(document).ready(function() {
  console.log('jQuery v2 managing modals and tooltips');
});

// Log to console showing both versions are active
console.log('=== jQuery noConflict() Demo ===');
console.log('jQuery v1 version:', $v1.fn.jquery);
console.log('jQuery v2 version:', $v2.fn.jquery);
console.log('Both versions operating independently!');
