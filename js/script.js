let cart = JSON.parse(localStorage.getItem('cart'))  || [];

function addItemToCart(item) {
    // Check if item already exists in cart
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.count++;
    } else {
        item.count = 1;
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function decrementItemInCart(itemId) {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem && existingItem.count > 0) {
        existingItem.count--;
        if (existingItem.count === 0) {
            cart = cart.filter(cartItem => cartItem.id !== itemId);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.count, 0);
    const cartButton = document.getElementById("cart-button");
    cartButton.innerHTML = `<i class="fa fa-shopping-cart" style="font-size:26px">${cartCount}</i>`;

    localStorage.setItem("cartCount", cartCount);
}

// Update cart count when page loads
document.addEventListener("DOMContentLoaded", function() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
})
