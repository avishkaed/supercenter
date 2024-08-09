document.addEventListener('DOMContentLoaded', function() {
    // Existing code to populate the order summary table
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderSummaryTableBody = document.querySelector('#orderSummaryTable tbody');
    const finalPriceElement = document.querySelector('#finalPrice');

    let totalPrice = 0;

    cart.forEach((item) => {
        const row = document.createElement('tr');

        const itemCell = document.createElement('td');
        itemCell.textContent = item.name;

        const priceCell = document.createElement('td');
        priceCell.textContent = `Rs. ${item.price.toFixed(2)}`;

        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;

        const totalCell = document.createElement('td');
        const itemTotal = item.price * item.quantity;
        totalCell.textContent = `Rs. ${itemTotal.toFixed(2)}`;

        row.appendChild(itemCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(totalCell);

        orderSummaryTableBody.appendChild(row);

        totalPrice += itemTotal;
    });

    finalPriceElement.textContent = `Total price: LKR. ${totalPrice.toFixed(2)}`;

    // Handling form submission
    const FinalOrderForm = document.querySelector('.FinalOrderForm');
    
    FinalOrderForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        // Retrieve form data
        const formData = new FormData(FinalOrderForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const address = formData.get('address');
        const cardNumber = formData.get('cardNumber');
        const expiryDate = formData.get('expiryDate');
        const cvv = formData.get('cvv');

        // Check if all fields are filled
        if (name && email && phone && address && cardNumber && expiryDate && cvv) {
            // Calculate delivery date (5 days from today)
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 5);

            // Display a thank you message with the delivery date
            alert(`Thank you for your purchase, ${name}! Your order will be delivered on ${deliveryDate.toDateString()}.`);

            // Optionally, clear the cart and reset the form
            localStorage.removeItem('cart');
            FinalOrderForm.reset();

            // Optionally, clear the table on the order page
            orderSummaryTableBody.innerHTML = '';
            finalPriceElement.textContent = 'Total price: LKR. 0.00';
            window.location.href = './index.html';
        } else {
            alert('Please fill in all required fields.');
        }
    });
});
