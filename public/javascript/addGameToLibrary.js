async function addToGameLibrary(event) {
  event.preventDefault();

  const title = document.querySelector("#title").textContent;

  console.log(title);

  const response = await fetch("/api/librarys/", {
    method: "POST",
    body: JSON.stringify({
      title,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    alert("This game was added to your library");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#add-to-library-btn")
  .addEventListener("click", addToGameLibrary);
