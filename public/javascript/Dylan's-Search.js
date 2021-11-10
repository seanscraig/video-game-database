require('dotenv').config();

async function searchGames(event) {
    event.preventDefault();

    
    const gameName = document.querySelector('.searchField').value.trim();

    var gameRequestURL = `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${gameName}`
    
    const response = await fetch('/api/games', {
        method: 'GET',
        body: JSON.stringify({
            gameName,
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.replace(`/api/games/${gameName}`)
    } else {
        const newResponse = await fetch(gameRequestURL)
            if(newResponse.ok) {
                //Add post route from the controllers section.
            }
    }
}
document.querySelector('.search').addEventListener('submit', searchGames)