document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart');
    const totalPriceElement = document.getElementById('total-price');

    function updateCart() {
        cartContainer.innerHTML = '';
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            totalPriceElement.textContent = '₱0.00';
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>₱${item.price.toFixed(2)}</p>
                <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="item-quantity">
                <button class="remove-item" data-index="${index}">Remove</button>
                <p>Subtotal: ₱${itemTotal.toFixed(2)}</p>
            `;
            cartContainer.appendChild(cartItem);

            const quantityInput = cartItem.querySelector('.item-quantity');
            quantityInput.addEventListener('change', function() {
                const newQuantity = parseInt(this.value, 10);
                cart[index].quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            });

            const removeButton = cartItem.querySelector('.remove-item');
            removeButton.addEventListener('click', function() {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            });
        });

        totalPriceElement.textContent = `Total: ₱${total.toFixed(2)}`;
    }

    updateCart();
});
