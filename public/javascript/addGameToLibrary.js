var $modalEl = document.getElementById("myModal");
var $modalText = document.getElementById("modal-text");
var $closeSpan = document.getElementsByClassName("close")[0];

async function addToGameLibrary(event) {
  event.preventDefault();

  const title = document.querySelector("#title").textContent;

  const response = await fetch("/api/librarys/", {
    method: "POST",
    body: JSON.stringify({
      title,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/me");
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

document
  .querySelector("#add-to-library-btn")
  .addEventListener("click", addToGameLibrary);
