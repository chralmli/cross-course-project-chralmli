document.addEventListener('DOMContentLoaded', async function() {
    const gamesGrid = document.querySelector(".games-container .games-grid");
    const loadingIndicator = document.getElementById("loading-indicator");

    let contentLoaded = false;
    let minTimeElapsed = false;
    let gamesData;

    // Display content and hide loading indicator
    const displayAndHideLoading = () => {
        if (contentLoaded && minTimeElapsed) {
            loadingIndicator.style.display = "none";

            gamesData.forEach(game => {
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
        }
    };

    // Show loading indicator
    loadingIndicator.style.display = "block";

    // Start timer
    setTimeout(() => {
        minTimeElapsed = true;
        displayAndHideLoading();
    }, 500);

    // Fetch the games data from the API
    try {
        const response = await fetch("https://api.noroff.dev/api/v1/gamehub");
        gamesData = await response.json();

        // Content has loaded
        contentLoaded = true;

        // Check if it's time to display the content and hide the loading indicator
        displayAndHideLoading();
    } catch (error) {
        console.error("Fetch error:", error);

        // Content has loaded (but there's an error)
        contentLoaded = true;

        displayAndHideLoading();
    }
});