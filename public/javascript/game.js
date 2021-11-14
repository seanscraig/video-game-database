var $modalEl = document.getElementById("myModal");
var $modalText = document.getElementById("modal-text");
var $closeSpan = document.getElementsByClassName("close")[0];

async function loadGame(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/games/${id}`, {
    method: "GET",
    body: JSON.stringify({
      id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace(`/api/games/${id}`);
  } else {
    openModal(response.statusText);
  }
}

// Modal stuff
function openModal(errorText) {
  $modalText.textContent = errorText;
  $modalEl.style.display = "block";
}

$closeSpan.onclick = function () {
  $modalEl.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == $modalEl) {
    $modalEl.style.display = "none";
  }
};

document.querySelector(".game").addEventListener("click", loadGame);
