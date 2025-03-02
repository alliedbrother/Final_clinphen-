// Register user
async function registerUser(username, password) {
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    return response.json();
}

// Login user
async function loginUser(username, password) {
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    return response.json();
}

// Fetch matches
async function fetchMatches() {
    const response = await fetch('http://localhost:3000/matches');
    return response.json();
}

// ...existing code...
