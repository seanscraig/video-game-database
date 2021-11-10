async function loadGame(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/games/${id}`, {
        method: 'GET',
        body: JSON.stringify({
            id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace(`/api/games/${id}`)
    } else {
        alert(response.statusText)
    }
}

document.querySelector('.game').addEventListener('click', loadGame);