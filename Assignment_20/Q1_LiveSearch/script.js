// Q1 - Real-Time Live Search with jQuery AJAX

$(document).ready(function() {
  const API_URL = 'http://localhost:3001/products';
  let searchTimeout;

  // Load all products initially
  loadProducts('');

  // Real-time search on keyup
  $('#searchInput').on('keyup', function() {
    const searchQuery = $(this).val().trim();
    
    // Clear previous timeout
    clearTimeout(searchTimeout);
    
    // Debounce: Wait 300ms after user stops typing
    searchTimeout = setTimeout(function() {
      loadProducts(searchQuery);
    }, 300);
  });

  // Function to load products with search query
  function loadProducts(query) {
    // Show loading indicator
    $('#loadingIndicator').show();
    $('#searchResults').empty();
    $('#resultsCount').hide();

    // Build API URL with query parameter
    const url = query ? `${API_URL}?q=${encodeURIComponent(query)}` : API_URL;

    // jQuery AJAX GET request
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: function(products) {
        // Hide loading indicator
        $('#loadingIndicator').hide();

        // Check if products found
        if (products.length === 0) {
          showNoResults();
        } else {
          displayProducts(products, query);
        }
      },
      error: function(xhr, status, error) {
        // Hide loading indicator
        $('#loadingIndicator').hide();
        
        // Show error message
        $('#searchResults').html(`
          <div class="no-results">
            <div class="no-results-icon">⚠️</div>
            <div class="no-results-text">Error loading products</div>
            <div class="no-results-subtitle">${error}</div>
          </div>
        `);
      }
    });
  }

  // Function to display products
  function displayProducts(products, query) {
    $('#searchResults').empty();

    // Show results count
    const countText = query 
      ? `Found ${products.length} product${products.length !== 1 ? 's' : ''} for "${query}"`
      : `Showing all ${products.length} products`;
    $('#resultsCount').text(countText).show();

    // Create product cards
    products.forEach(function(product) {
      const productCard = `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" class="product-image" 
               onerror="this.src='https://via.placeholder.com/200x200?text=No+Image'">
          <div class="product-name">${highlightText(product.name, query)}</div>
          <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
      `;
      $('#searchResults').append(productCard);
    });
  }

  // Function to show no results message
  function showNoResults() {
    $('#resultsCount').hide();
    $('#searchResults').html(`
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <div class="no-results-text">No products found</div>
        <div class="no-results-subtitle">Try searching with different keywords</div>
      </div>
    `);
  }

  // Function to highlight matched text
  function highlightText(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span style="background: #fff3cd; padding: 2px 4px; border-radius: 3px;">$1</span>');
  }
});
