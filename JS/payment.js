document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addToFavoritesButton').addEventListener('click', addToFavourites);
    document.getElementById('applyFavoritesButton').addEventListener('click', applyFavourites);
    document.getElementById('buyNowButton').addEventListener('click', buyNow);

    let cartButtons = document.getElementsByClassName('cart-button');
    for (let i = 0; i < cartButtons.length; i++) {
        cartButtons[i].addEventListener('click', addToCart);
    }

    function addToCart(event) {
        event.preventDefault();
        let item = event.target.closest('.vegetable-item');
        let itemName = item.querySelector('h3').textContent;
        let itemPrice = parseFloat(item.querySelector('p').textContent.replace('Price: Rs.', '').replace('/-', '').trim());
        let itemQuantity = parseInt(item.querySelector('.number').value.trim(), 10);

        if (isNaN(itemQuantity) || itemQuantity <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTable();
    }

    function addToFavourites() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        localStorage.setItem('favourites', JSON.stringify(cart));
        alert('Items added to favourites.');
    }

    function applyFavourites() {
        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart = cart.concat(favourites);

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTable();
    }

    function buyNow() {
        window.location.href = 'paymentPage.html';
    }

    function updateCartTable() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartTableBody = document.querySelector('#cartTable tbody');
        cartTableBody.innerHTML = '';

        cart.forEach(item => {
            let total = item.price * item.quantity;
            let row = document.createElement('tr');
            row.innerHTML = `<td>${item.name}</td>
                             <td>Rs.${item.price}/-</td>
                             <td>${item.quantity}</td>
                             <td>Rs.${total}/-</td>
                             <td><button class="removeButton">Remove</button></td>`;
            cartTableBody.appendChild(row);
        });

        let removeButtons = document.getElementsByClassName('removeButton');
        for (let i = 0; i < removeButtons.length; i++) {
            removeButtons[i].addEventListener('click', removeFromCart);
        }
    }

    function removeFromCart(event) {
        let row = event.target.closest('tr');
        let itemName = row.cells[0].textContent;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.name !== itemName);

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTable();
    }

    updateCartTable();
});
