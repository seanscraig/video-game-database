async function searchGames(event) {
    event.preventDefault();

    var searchResult = event.target.previousElementSibling.value
    document.location.replace(`/title/${searchResult}`)
    // const response = await fetch('/title/'+searchResult, { 
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' }
    // });
    // if (response.ok) {
    //     document.location.replace(`/title/${searchResult}`)
    // } else {
    //     alert(response.statusText)
    // }
}

document.querySelector('.search').addEventListener('click', searchGames)