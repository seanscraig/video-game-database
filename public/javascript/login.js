async function loginFormHandler(event) {
    event.preventDefault();
  
    const user_name = document.querySelector('#user-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (user_name && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          user_name,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/me');
      } else {
        alert(response.statusText);
      }
    }
  }
  
console.log("js is connected!")
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);