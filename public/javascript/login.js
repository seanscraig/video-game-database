var $modalEl = document.getElementById("myModal");
var $modalText = document.getElementById("modal-text");
var $closeSpan = document.getElementsByClassName("close")[0];

async function loginFormHandler(event) {
  event.preventDefault();

  const user_name = document.querySelector("#user-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (user_name && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        user_name,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/me");
    } else {
      openModal(response.statusText);
    }
  } else {
    openModal("Please fill in all fields");
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
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
