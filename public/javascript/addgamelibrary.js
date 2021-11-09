async function addToGameLibrary(event) {
    event.preventDefault();

    const gameName = document.querySelector('#game-name') //may need to change id name depending on how we define it in html.
    const gameImage = document.querySelector('#game-image') //may need to change id name depending on how we define it in html.

    const response = await fetch('/api/libraryRoutes', {
        method: 'post',
        body: JSON.stringify({
            gameName,
            gameImage
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if(response.ok) {
        alert('This game was added to your library')
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#add-to-game-library').addEventListener('submit', addToGameLibrary) // change id depending on what we name it in html