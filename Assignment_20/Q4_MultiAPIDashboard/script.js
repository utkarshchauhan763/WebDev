// Q4 - Multi-API Dashboard using Fetch + Promise.all

const BASE_URL = 'http://localhost:3004';

// Load dashboard on page load
window.addEventListener('DOMContentLoaded', function() {
  loadDashboard();
});

// Reload button click
document.getElementById('reloadBtn').addEventListener('click', function() {
  loadDashboard();
});

// Function to load all data using Promise.all
function loadDashboard() {
  // Hide warning banner
  document.getElementById('warningBanner').classList.remove('show');
  
  // Show skeleton loaders
  document.getElementById('statsGrid').innerHTML = `
    <div class="skeleton"></div>
    <div class="skeleton"></div>
    <div class="skeleton"></div>
  `;
  
  document.getElementById('detailsSection').innerHTML = '';

  // Fetch all three endpoints simultaneously using Promise.all
  Promise.all([
    fetch(`${BASE_URL}/users`).then(res => {
      if (!res.ok) throw new Error('Users API failed');
      return res.json();
    }),
    fetch(`${BASE_URL}/orders`).then(res => {
      if (!res.ok) throw new Error('Orders API failed');
      return res.json();
    }),
    fetch(`${BASE_URL}/products`).then(res => {
      if (!res.ok) throw new Error('Products API failed');
      return res.json();
    })
  ])
  .then(([users, orders, products]) => {
    // All APIs succeeded
    displayStats(users.length, orders.length, products.length);
    displayDetails(users, orders, products);
  })
  .catch(error => {
    console.error('Error loading dashboard:', error);
    
    // Show warning banner
    document.getElementById('warningBanner').classList.add('show');
    
    // Try to load whatever data is available
    loadPartialData();
  });
}

// Function to load partial data if Promise.all fails
function loadPartialData() {
  let usersCount = 0;
  let ordersCount = 0;
  let productsCount = 0;
  let usersData = [];
  let ordersData = [];
  let productsData = [];

  // Try to fetch each API individually
  Promise.allSettled([
    fetch(`${BASE_URL}/users`).then(res => res.json()),
    fetch(`${BASE_URL}/orders`).then(res => res.json()),
    fetch(`${BASE_URL}/products`).then(res => res.json())
  ])
  .then(results => {
    // Check each result
    if (results[0].status === 'fulfilled') {
      usersData = results[0].value;
      usersCount = usersData.length;
    }
    
    if (results[1].status === 'fulfilled') {
      ordersData = results[1].value;
      ordersCount = ordersData.length;
    }
    
    if (results[2].status === 'fulfilled') {
      productsData = results[2].value;
      productsCount = productsData.length;
    }

    // Display whatever data we have
    displayStats(usersCount, ordersCount, productsCount, results);
    displayDetails(usersData, ordersData, productsData);
  });
}

// Function to display statistics
function displayStats(usersCount, ordersCount, productsCount, results = null) {
  const statsGrid = document.getElementById('statsGrid');
  statsGrid.innerHTML = '';

  // Users card
  const usersCard = createStatCard(
    'users',
    '👥',
    'Total Users',
    usersCount,
    results && results[0].status === 'rejected'
  );
  statsGrid.appendChild(usersCard);

  // Orders card
  const ordersCard = createStatCard(
    'orders',
    '📦',
    'Total Orders',
    ordersCount,
    results && results[1].status === 'rejected'
  );
  statsGrid.appendChild(ordersCard);

  // Products card
  const productsCard = createStatCard(
    'products',
    '🛍️',
    'Total Products',
    productsCount,
    results && results[2].status === 'rejected'
  );
  statsGrid.appendChild(productsCard);
}

// Function to create a stat card
function createStatCard(type, icon, label, value, failed = false) {
  const card = document.createElement('div');
  card.className = `stat-card ${type}`;
  
  if (failed) {
    card.style.opacity = '0.5';
    card.innerHTML = `
      <div class="stat-icon">${icon}</div>
      <div class="stat-label">${label}</div>
      <div style="font-size: 18px; margin-top: 10px;">❌ Failed to load</div>
    `;
  } else {
    card.innerHTML = `
      <div class="stat-icon">${icon}</div>
      <div class="stat-label">${label}</div>
      <div class="stat-value">${value}</div>
    `;
  }
  
  return card;
}

// Function to display detailed data
function displayDetails(users, orders, products) {
  const detailsSection = document.getElementById('detailsSection');
  detailsSection.innerHTML = '';

  // Users detail card
  if (users && users.length > 0) {
    const usersCard = createDetailCard('Users List', users.map(u => 
      `<strong>${u.name}</strong><br><span style="color: #999; font-size: 12px;">${u.email}</span>`
    ));
    detailsSection.appendChild(usersCard);
  }

  // Orders detail card
  if (orders && orders.length > 0) {
    const ordersCard = createDetailCard('Recent Orders', orders.map(o => 
      `Order #${o.id}: ${o.product} - <strong>$${o.amount}</strong>`
    ));
    detailsSection.appendChild(ordersCard);
  }

  // Products detail card
  if (products && products.length > 0) {
    const productsCard = createDetailCard('Products Inventory', products.map(p => 
      `${p.name} <span style="color: #999;">(${p.category})</span> - <strong>${p.stock} in stock</strong>`
    ));
    detailsSection.appendChild(productsCard);
  }
}

// Function to create a detail card
function createDetailCard(title, items) {
  const card = document.createElement('div');
  card.className = 'detail-card';
  
  const header = document.createElement('div');
  header.className = 'detail-header';
  header.textContent = title;
  card.appendChild(header);
  
  const list = document.createElement('div');
  list.className = 'detail-list';
  
  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'detail-item';
    itemDiv.innerHTML = item;
    list.appendChild(itemDiv);
  });
  
  card.appendChild(list);
  return card;
}
