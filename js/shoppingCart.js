console.log("file loaded");
document.addEventListener("DOMContentLoaded", function() {
    const cartContainer = document.querySelector(".cart-container .cart-content-container");
    const checkoutForm = document.getElementById("checkout-form");

    let cart = [];

    // remove item from cart
    function removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
    }

    // increment the cart item quantity
    function incrementItem(id) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.count++;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCartItems();
        }
    }

    function decrementItem(id) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.count--;
            if (item.count === 0) {
                removeItem(id);
            } else {
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCartItems();
            }
        }
    }

    // Render cart items
    function renderCartItems() {

        // Retrieve cart items from local storage
        cart = JSON.parse(localStorage.getItem("cart") || "[]");
        let cartHTML = "";

        cart.forEach(item => {
            const cartItemHTML = createCartItemHTML(item);
            cartHTML += cartItemHTML;
        });

        cartContainer.innerHTML = cartHTML;

        updateSubtotal();
    }

    function createCartItemHTML(item) {
        const cartItemHTML = `
        <div class="cart-items">
            <div class="img-box">
                <img src="${item.image}" alt="${item.title}" height="65px">
            </div>
            <div class="desc">
                <h1 class="title">${item.title}</h1>
                <h3 class="platform">${item.genre}</h3>
            </div>
            <div class="counter">
                <i class="fa-solid fa-plus" data-item-id="${item.id}"></i>
                <div class="count">${item.count}</div>
                <i class="fa-solid fa-minus" data-item-id="${item.id}"></i>
            </div>
            <div class="prices">
                <div class="amount">$${item.price}</div>
            </div>
            <div class="remove">
                <i class="fa-solid fa-trash" data-item-id="${item.id}"></i>
            </div>
        </div>
        `;

        return cartItemHTML;
    }

    function updateSubtotal() {
        const subtotal = cart.reduce((acc, item) => acc + item.price * item.count, 0);
        document.querySelector(".price-info").innerText = `$${subtotal}`;
    }

    renderCartItems();

    // Add event listeners to dynamically created elements
    cartContainer.addEventListener("click", function(e) {
        if (e.target.classList.contains("fa-trash")) {
            const itemId = e.target.getAttribute("data-item-id");
            removeItem(itemId);
        } else if (e.target.classList.contains("fa-plus")) {
            const itemId = e.target.getAttribute("data-item-id");
            incrementItem(itemId);
        } else if (e.target.classList.contains("fa-minus")) {
            const itemId = e.target.getAttribute("data-item-id");
            decrementItem(itemId);
        }
    });

    checkoutForm.addEventListener("submit", function(e) {
        e.preventDefault();

        console.log("Checkout successful!");
    });
});