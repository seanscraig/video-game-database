async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
      
      const response = await fetch(`/api/games/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          game_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert("The game has been deleted");
      }
      
}

document.querySelector('.delete-game-btn').addEventListener('click', deleteFormHandler);