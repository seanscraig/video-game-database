async function signupSubmit(event) {
    event.preventDefault();

    const user_name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    console.log(user_name);
    console.log(email);
    console.log(password);

    if (user_name && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                user_name,
                password,
                email
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('Account created page!')
            document.location.replace('/me');

        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#signup-form').addEventListener('click', signupSubmit);