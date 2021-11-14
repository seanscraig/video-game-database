var $modalEl = document.getElementById("myModal");
var $modalText = document.getElementById("modal-text");
var $closeSpan = document.getElementsByClassName("close")[0];

async function logout() {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    openModal("Failed to log out.");
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

document.querySelector("#logout").addEventListener("click", logout);
