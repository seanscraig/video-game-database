var $modalEl = document.getElementById("myModal");
var $modalText = document.getElementById("modal-text");
var $closeSpan = document.getElementsByClassName("close")[0];

async function addToGameWishlist(event) {
  event.preventDefault();

  const title = document.querySelector("#title").textContent;

  const response = await fetch("/api/wishlists/", {
    method: "POST",
    body: JSON.stringify({
      title,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace('/wishlist/me')
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
  .querySelector("#add-to-wishlist-btn")
  .addEventListener("click", addToGameWishlist); // change id depending on what we name it in html
