const API_URL = 'http://localhost:5000/api/items';

// Load items on page load
document.addEventListener('DOMContentLoaded', loadItems);

// Form submission
document.getElementById('itemForm').addEventListener('submit', addItem);

// Refresh button
document.getElementById('refreshBtn').addEventListener('click', loadItems);

async function loadItems() {
  try {
    const response = await fetch(API_URL);
    const items = await response.json();
    displayItems(items);
  } catch (error) {
    console.error('Error loading items:', error);
    showMessage('Error loading items', 'error');
  }
}

function displayItems(items) {
  const itemsList = document.getElementById('itemsList');
  
  if (items.length === 0) {
    itemsList.innerHTML = '<div class="empty-message">No items yet. Create one to get started!</div>';
    return;
  }

  itemsList.innerHTML = items.map(item => `
    <div class="item-card">
      <div class="item-name">${escapeHtml(item.name)}</div>
      <div class="item-description">${escapeHtml(item.description || 'No description')}</div>
      <div class="item-price">$${item.price.toFixed(2)}</div>
      <div class="item-quantity">Quantity: ${item.quantity}</div>
      <div class="item-date">Created: ${new Date(item.createdAt).toLocaleDateString()}</div>
      <div class="item-actions">
        <button class="btn-edit" onclick="editItem('${item._id}')">Edit</button>
        <button class="btn-delete" onclick="deleteItem('${item._id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

async function addItem(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const quantity = parseInt(document.getElementById('quantity').value);

  if (!name || !price) {
    showMessage('Please fill in all required fields', 'error');
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, quantity })
    });

    if (!response.ok) throw new Error('Failed to add item');

    showMessage('Item added successfully!', 'success');
    document.getElementById('itemForm').reset();
    loadItems();
  } catch (error) {
    console.error('Error adding item:', error);
    showMessage('Error adding item', 'error');
  }
}

async function deleteItem(id) {
  if (!confirm('Are you sure you want to delete this item?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete item');

    showMessage('Item deleted successfully!', 'success');
    loadItems();
  } catch (error) {
    console.error('Error deleting item:', error);
    showMessage('Error deleting item', 'error');
  }
}

function editItem(id) {
  alert('Edit functionality coming soon! Item ID: ' + id);
  // This can be expanded to open an edit modal
}

function showMessage(text, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = text;
  
  const container = document.querySelector('.container');
  container.insertBefore(messageDiv, container.firstChild);

  setTimeout(() => messageDiv.remove(), 3000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
