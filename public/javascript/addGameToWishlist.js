async function addToGameWishlist(event) {
  event.preventDefault();

  const title = document.querySelector("#title").textContent;

  console.log(title);

  const response = await fetch("/api/wishlists/", {
    method: "POST",
    body: JSON.stringify({
      title,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    alert("This game was added to your wishlist");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#add-to-wishlist-btn")
  .addEventListener("click", addToGameWishlist); // change id depending on what we name it in html
