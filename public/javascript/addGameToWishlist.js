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
    alert(response.statusText);
  }
}

document
  .querySelector("#add-to-wishlist-btn")
  .addEventListener("click", addToGameWishlist); // change id depending on what we name it in html
