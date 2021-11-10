async function addToGameWishlist(event) {
    event.preventDefault();

    const gameName = document.querySelector('#game-name') //may need to change id name depending on how we define it in html.
    const gameImage = document.querySelector('#game-image') //may need to change id name depending on how we define it in html.

    const response = await fetch('/api/wishlistRoutes', {
        method: 'POST',
        body: JSON.stringify({
            gameName,
            gameImage
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if(response.ok) {
        alert('This game was added to your wishlist')
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#add-to-game-wishlist').addEventListener('submit', addToGameWishlist) // change id depending on what we name it in html