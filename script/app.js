// Initialize or retrieve the cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to the cart
function addToCart(productName, price) {
    // Check if the product is already in the cart
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        // If item exists, increment the quantity
        existingItem.quantity += 1;
    } else {
        // If item doesn't exist, add a new item with quantity 1
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    // Save the updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Notify the user
    alert(productName + ' has been added to your cart.');
    updateCartCount(); // Update cart item count in header
}

// Function to update the cart count in the header
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Function to display cart items and calculate total on the Cart Page
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItemsContainer.innerHTML = ''; // Clear any existing items

    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        // Loop through each item in the cart to display it
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity; // Calculate total for each item
            total += itemTotal; // Add item total to overall total

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <p><strong>${item.name}</strong> - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Update the total price
        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    }
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    const itemIndex = cart.findIndex(item => item.name === productName);

    if (itemIndex !== -1) {
        // If the item exists, remove it
        cart.splice(itemIndex, 1);

        // Update the cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the cart display and count
        displayCart();
        updateCartCount();
    }
}

// Run this on page load to update cart count and display the cart
window.onload = function() {
    updateCartCount(); // Update the cart count in the header
    if (document.getElementById('cart-items')) {
        displayCart(); // Display cart items on the Cart Page
    }
};
