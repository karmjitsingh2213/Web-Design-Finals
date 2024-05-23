document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Retrieve form data
        const formData = new FormData(checkoutForm);

        // Convert form data to object
        const orderDetails = {};
        formData.forEach((value, key) => {
            orderDetails[key] = value;
        });

        // Save order details to local storage
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

        // Redirect to success page
        window.location.href = 'success.html';
    });
});
