const signupFormHandler = async function(event) {
    event.preventDefault();
    const usernameEl = document.querySelector('#username').value;
    const passwordEl = document.querySelector('#password').value;
    console.log(usernameEl);
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl,
        password: passwordEl,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)
    if (response.ok) {
      // document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up');
    }
  };
  document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);