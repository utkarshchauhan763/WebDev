// Q2 - Product Highlight
$(document).ready(function() {
  
  // 1. Click on a product → highlight background
  $('.product').click(function(e) {
    // Don't trigger if clicking on favorite icon
    if ($(e.target).hasClass('favorite-icon')) {
      return;
    }
    
    // Remove highlight from all products
    $('.product').removeClass('highlighted');
    
    // Add highlight to clicked product
    $(this).addClass('highlighted');
  });
  
  // 2. Hover over a product → show additional product details
  $('.product').hover(
    function() {
      // Mouse enter - show details
      $(this).find('.product-details').slideDown(300);
    },
    function() {
      // Mouse leave - hide details
      $(this).find('.product-details').slideUp(300);
    }
  );
  
  // 3. Clicking a "Favorite" icon → toggles a "selected" class
  $('.favorite-icon').click(function(e) {
    e.stopPropagation(); // Prevent product click from firing
    
    const product = $(this).closest('.product');
    product.toggleClass('selected');
    
    // Change icon based on selection
    if (product.hasClass('selected')) {
      $(this).text('❤️');
    } else {
      $(this).text('🤍');
    }
  });
  
  // 4. Apply different styles to products with discounts using attribute selector
  // Already styled in CSS using: .product[data-discount="true"]
  // Let's add additional jQuery styling
  $('[data-discount="true"]').css({
    'box-shadow': '0 4px 12px rgba(220, 53, 69, 0.2)'
  });
  
  // 5. Show an alert if a product is out of stock (using data attribute)
  $('.product').click(function(e) {
    // Don't trigger if clicking on favorite icon
    if ($(e.target).hasClass('favorite-icon')) {
      return;
    }
    
    const isInStock = $(this).data('stock');
    
    if (!isInStock) {
      const productName = $(this).find('.product-name').text();
      alert('⚠️ Sorry! ' + productName + ' is currently out of stock.\nWe will notify you when it becomes available.');
    }
  });
  
});
