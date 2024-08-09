document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart and favorites from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    const addToCartButtons = document.querySelectorAll('.btn, .btn2');
    const cartTableBody = document.querySelector('#adTocartTable tbody');
    const priceTotalElement = document.querySelector('#PriceTotal');
    const addToFavoritesButton = document.querySelector('#addToFavoritesButton');
    const applyFavoritesButton = document.querySelector('#applyFavoritesButton');
    const finalizeOrderButton = document.querySelector('#finalizeOrderButton');
  
    let cartItems = cart; // Initialize cartItems with saved cart data
  
    function updateCartDisplay() {
        // Update the cart display logic
        updateCart();
    }
    
    function updateFavoritesDisplay() {
        // Update the favorites display logic
        // (Implementation can be added as needed)
    }
    
    function updateCart() {
        cartTableBody.innerHTML = '';
        let totalPrice = 0;
    
        cartItems.forEach((item, index) => {
            const row = document.createElement('tr');
    
            const itemCell = document.createElement('td');
            itemCell.textContent = item.name;
    
            const priceCell = document.createElement('td');
            priceCell.textContent = `Rs. ${item.price.toFixed(2)}`;
    
            const quantityCell = document.createElement('td');
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = item.quantity;
            quantityInput.addEventListener('change', (e) => {
                item.quantity = parseInt(e.target.value);
                updateCart();
            });
            quantityCell.appendChild(quantityInput);
    
            const removeCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                cartItems.splice(index, 1);
                updateCart();
            });
            removeCell.appendChild(removeButton);
    
            row.appendChild(itemCell);
            row.appendChild(priceCell);
            row.appendChild(quantityCell);
            row.appendChild(removeCell);
    
            cartTableBody.appendChild(row);
    
            totalPrice += item.price * item.quantity;
        });
    
        priceTotalElement.textContent = `Total price: LKR. ${totalPrice.toFixed(2)}`;
    }
    
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productElement = e.target.closest('.order-products');
            const productName = productElement.querySelector('h3').textContent;
            const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('Rs.', '').trim());
    
            const existingItem = cartItems.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({ name: productName, price: productPrice, quantity: 1 });
            }
    
            updateCart();
        });
    });
  
    addToFavoritesButton.addEventListener('click', () => {
        localStorage.setItem('favorites', JSON.stringify(cartItems));
    });
  
    applyFavoritesButton.addEventListener('click', () => {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        if (favorites) {
            cartItems = favorites;
            updateCart();
        }
    });
  
    finalizeOrderButton.addEventListener('click', () => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        window.location.href = './FinalizeOrderPage.html'; 
    });
  
    updateCartDisplay();
    updateFavoritesDisplay();
});
