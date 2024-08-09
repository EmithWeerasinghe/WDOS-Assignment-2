document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addToFavoritesButton').addEventListener('click', addToFavourites);
    document.getElementById('applyFavoritesButton').addEventListener('click', applyFavourites);
    document.getElementById('buyNowButton').addEventListener('click', buyNow);

    var cartButtons = document.getElementsByClassName('cart-button');
    for (var i = 0; i < cartButtons.length; i++) {
        cartButtons[i].addEventListener('click', addToCart);
    }

    function addToCart(event) {
        event.preventDefault();
        var item = event.target.closest('.vegetable-item');
        var itemName = item.querySelector('h3').textContent;
        var itemPrice = parseFloat(item.querySelector('p').textContent.replace('Price: Rs.', '').replace('/-', ''));
        var itemQuantity = parseInt(item.querySelector('.number').value);

        if (isNaN(itemQuantity) || itemQuantity <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }

        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTable();
    }

    function addToFavourites() {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        localStorage.setItem('favourites', JSON.stringify(cart));
        alert('Items added to favourites.');
    }

    function applyFavourites() {
        var favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        var cart = JSON.parse(localStorage.getItem('cart')) || [];

        for (var i = 0; i < favourites.length; i++) {
            cart.push(favourites[i]);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTable();
    }

    function buyNow() {
        window.location.href = 'paymentPage.html';
    }

    function updateCartTable() {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        var cartTableBody = document.querySelector('#cartTable tbody');
        cartTableBody.innerHTML = '';
        var totalPrice = 0;

        for (var i = 0; i < cart.length; i++) {
            var row = document.createElement('tr');
            var itemTotal = cart[i].price * cart[i].quantity;
            totalPrice += itemTotal;
            row.innerHTML = '<td>' + cart[i].name + '</td>' +
                            '<td>Rs. ' + cart[i].price + '/-</td>' +
                            '<td>' + cart[i].quantity + '</td>' +
                            '<td>Rs. ' + itemTotal + '/-</td>' +
                            '<td><button class="removeButton">Remove</button></td>';
            cartTableBody.appendChild(row);
        }

        document.getElementById('totalPrice').textContent = 'Rs. ' + totalPrice + '/-';

        // Save the table's inner HTML to localStorage
        localStorage.setItem('cartTable', cartTableBody.innerHTML);
    
        var removeButtons = document.getElementsByClassName('removeButton');
        for (var i = 0; i < removeButtons.length; i++) {
            removeButtons[i].addEventListener('click', removeFromCart);
        }
    }

    function removeFromCart(event) {
        var row = event.target.closest('tr');
        var itemName = row.cells[0].textContent;

        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(function(item) {
            return item.name !== itemName;
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTable();
    }

    updateCartTable();
});
