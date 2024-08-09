document.addEventListener('DOMContentLoaded', function() {
    var paymentTypeSelect = document.getElementById('payment-type');
    var cardDetailsDiv = document.getElementById('card-details');
    var payButton = document.getElementById('pay-button');
    var messageDiv = document.getElementById('message');
    var checkoutForm = document.getElementById('checkout-form');

    var savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedCart.length > 0) {
        var cartTableBody = document.querySelector('#cartTable tbody');
        cartTableBody.innerHTML = '';
        var totalPrice = 0;

        savedCart.forEach(function(item) {
            var itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            var row = document.createElement('tr');
            row.innerHTML = '<td>' + item.name + '</td>' +
                            '<td>Rs. ' + item.price + '/-</td>' +
                            '<td>' + item.quantity + '</td>' +
                            '<td>Rs. ' + itemTotal + '/-</td>';
            cartTableBody.appendChild(row);
        });

        document.getElementById('totalPrice').textContent = 'Rs. ' + totalPrice + '/-';
    }

    paymentTypeSelect.addEventListener('change', function() {
        if (paymentTypeSelect.value === 'card') {
            cardDetailsDiv.style.display = 'block';
        } else {
            cardDetailsDiv.style.display = 'none';
        }
    });

    payButton.addEventListener('click', function() {
        if (validateForm()) {
            var deliveryDate = calculateDeliveryDate();
            var confirmationMessage = 'Thank you for your purchase! Your delivery is scheduled for ' + deliveryDate + ".";
            alert(confirmationMessage);
        } else {
            var errorMessage = 'Please fill out all required fields correctly.';
            alert(errorMessage);
        }
    });

    function validateForm() {
        var isValid = true;
        var requiredFields = ['name', 'email', 'phone', 'address', 'city', 'postal-code'];
        
        requiredFields.forEach(function(field) {
            var input = document.getElementById(field);
            if (!input.value.trim()) {
                isValid = false;
            }
        });

        if (paymentTypeSelect.value === 'card') {
            var cardFields = ['card-number', 'card-expiry', 'card-cvc'];
            cardFields.forEach(function(field) {
                var input = document.getElementById(field);
                if (!input.value.trim()) {
                    isValid = false;
                }
            });
        }

        return isValid;
    }

    function calculateDeliveryDate() {
        var today = new Date();
        var deliveryDate = new Date(today.setDate(today.getDate() + 7));
        return deliveryDate.toDateString();
    }
});
