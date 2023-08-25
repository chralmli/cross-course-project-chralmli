document.addEventListener('DOMContentLoaded', async function() {
    const gamesGrid = document.querySelector(".games-container .games-grid");

    // Show loading indicator
    const loadingIndicator = document.getElementById("loading-indicator");
    loadingIndicator.style.display = "block";
    
    // Fetch the games data from the API
    try {
        const response = await fetch("https://api.noroff.dev/api/v1/gamehub");
        const games = await response.json();

        const fourGames = games.slice(0, 4);

        loadingIndicator.style.display = "none";

        fourGames.forEach(game => {
            const gameItem = `
            <div class="game-item">
                <img src="${game.image}" alt="${game.title}" class="game-img">
                <div class="game-spec">
                    <h5 class="game-title">${game.title}</h5>
                    <h5 class="game-price">$${game.price}</h5>
                    <a href="game-specific.html?id=${game.id}">
                        <button class="game-btn btn">Details</button>
                    </a>
                </div>
            </div>`;
            gamesGrid.innerHTML += gameItem;
        });
    } catch (error) {
        console.error("Fetch error:", error);
    }
});


