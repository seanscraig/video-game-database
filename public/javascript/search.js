async function searchGames(event) {
    event.preventDefault();

    var searchResult = event.target.previousElementSibling.value

    const response = await fetch('/title/:title', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.replace(`/title/${searchResult}`)
    } else {
        alert(response.statusText)
    }
}

document.querySelector('.search').addEventListener('click', searchGames)