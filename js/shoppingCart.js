console.log("file loaded");
document.addEventListener("DOMContentLoaded", function() {
    const cartContainer = document.querySelector(".cart-container .cart-content-container");
    const checkoutForm = document.getElementById("checkout-form");
    const cartCountElement = document.querySelector(".cart-button-wrap a");
    let cart = [];

    // Saving the cart quantity in local storage
    localStorage.setItem("cartCount", cart.length);

    // Update cart counter 
    function updateCartCount() {
        const cartCount = localStorage.getItem("cartCount") || "0";
        const cartButton = document.getElementById("cart-button");
        cartButton.innerHTML = `<i class="fa fa-shopping-cart" style="font-size:26px">${cartCount}</i>`;
        const totalItems = cart.reduce((acc, item) => acc + item.count, 0);
        cartCountElement.innerHTML  = `<i class="fa fa-shopping-cart" style="font-size:26px"></i>${totalItems}`;
    }

    document.addEventListener("DOMContentLoaded", function() {
        updateCartCount();
    });

    function updatePrices() {
        const subtotal = cart.reduce((acc, item) => acc + item.price * item.count, 0);
        const shipping = 9.99;
        const total = subtotal + shipping;

        document.querySelector(".price-info:nth-child(1) span:last-child").innerText = `$${subtotal.toFixed(2)}`;
        document.querySelector(".price-info:nth-child(2) span:last-child").innerText = `$${shipping.toFixed(2)}`;
        document.querySelector(".price-info:nth-child(3) span:last-child").innerText = `$${total.toFixed(2)}`;
        document.querySelector(".check-btn-container .pay-btn span:first-child").innerText = `$${total.toFixed(2)}`;
    }

    function modifyCart(id, action) {
        const item = cart.find(item => item.id === id);
        if (item) {
            if (action === "increment") {
                item.count++;
            } else if (action === "decrement") {
                item.count--;
                if (item.count === 0) {
                    cart = cart.filter(item => item.id !== id);
                }
            } else if (action === "remove") {
                cart = cart.filter(item => item.id !== id);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCartItems();
            updatePrices();
            updateCartCount();
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
        updateCartCount();
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



    renderCartItems();
    updatePrices();

    // Add event listeners to dynamically created elements
    cartContainer.addEventListener("click", function(e) {
        const itemId = e.target.getAttribute("data-item-id");
        if (e.target.classList.contains("fa-trash")) {
            modifyCart(itemId, "remove");
        } else if (e.target.classList.contains("fa-plus")) {
            modifyCart(itemId, "increment");
        } else if (e.target.classList.contains("fa-minus")) {
            modifyCart(itemId, "decrement");
        }
    });

    checkoutForm.addEventListener("submit", function(e) {
        e.preventDefault();
        console.log("Checkout successful!");
    });
});