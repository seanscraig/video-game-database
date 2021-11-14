var $modalEl = document.getElementById("myModal");
var $modalText = document.getElementById("modal-text");
var $closeSpan = document.getElementsByClassName("close")[0];

async function signupSubmit(event) {
  event.preventDefault();

  const user_name = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (email && user_name && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        user_name,
        password,
        email,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/me");
    } else {
      openModal(response.statusText);
    }
  } else {
    openModal("Please fill in all of the fields");
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

document.querySelector("#signup-form").addEventListener("click", signupSubmit);
