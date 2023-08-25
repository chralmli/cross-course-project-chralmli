// Extract the game ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get("id");

// API endpoint including the game ID
const apiEndpoint = `https://api.noroff.dev/api/v1/gamehub/${gameId}`;

// Show loading indicator
const loadingIndicator = document.getElementById("loading-indicator");
loadingIndicator.style.display = "block";

// Fetch the specific game details
async function getGameDetails () {
    try {
        const response = await fetch(apiEndpoint);
        const game = await response.json();
        
        loadingIndicator.style.display = "none";

        // Create HTML
        const gameDetails = `
        <div class="left-col">
            <img src="${game.image}" alt="${game.title}" class="game-img">
        </div>
        <div class="right-col">
            <div class="info-wrap">
                <h1 class="spec-game-title">${game.title}</h1>
                <span class="spec-platform">Genre: ${game.genre}</span>
                <span class="price">$${game.price}</span>
            </div>
            <div class="buy-btn-wrap">
                <a href="cart.html"><button class="buy-btn btn">Buy Now</button></a>
            </div>
            <div class="game-desc">
            <p class="game-description">${game.description}</p>
            </div>
        </div>`;

        // Add the HTML to the container
        const gameContainer = document.querySelector(".game-container");
        gameContainer.innerHTML += gameDetails;

    } catch (error) {
        console.error("Fetch error:", error);
        // Hide loading indicator if there was an error
        loadingIndicator.style.display = "none";
    }
}

// Call the function to get the game details
getGameDetails();