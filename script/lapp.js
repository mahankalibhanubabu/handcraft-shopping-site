function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Here, you would normally send the data to the server to validate credentials
    if (username && password) {
        alert(`Welcome, ${username}!`);
        window.location.href = 'home.html'; // Redirect to home page after "login"
    } else {
        alert('Please enter valid credentials.');
    }
}
