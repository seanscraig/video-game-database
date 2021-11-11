async function loadWishlist(event) {
    event.preventDefault();

    const response = await fetch('/wishlist/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.replace('/wishlist/me');
    } else {
        alert(response.statusText);
    }
}
document.querySelector('.wishlistLibrary').addEventListener('click', loadWishlist)