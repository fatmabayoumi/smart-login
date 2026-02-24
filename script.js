
const navbar = document.querySelector('.navbar');
const loginContainer = document.getElementById('loginContainer');
const signupContainer = document.getElementById('signupContainer');
const homeContainer = document.getElementById('homeContainer');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const signupMessage = document.getElementById('signupMessage');
const userNameDisplay = document.getElementById('userNameDisplay');
const logoutBtn = document.getElementById('logoutBtn');


let users = JSON.parse(localStorage.getItem('users')) || [];

if (users.length === 0) {
    users.push({
        name: 'fatma',
        email: 'fatma@example.com',
        password: '123456'
    });
    localStorage.setItem('users', JSON.stringify(users));
}


function checkLoggedInUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        showHomePage(currentUser.name);
    } else {
        navbar.style.display = 'none';
    }
}


function showHomePage(userName) {
    navbar.style.display = 'block';
    loginContainer.classList.add('hidden');
    signupContainer.classList.add('hidden');
    homeContainer.classList.remove('hidden');
    userNameDisplay.textContent = userName;
}


showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.classList.add('hidden');
    signupContainer.classList.remove('hidden');
    signupMessage.classList.add('hidden');
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    signupMessage.classList.add('hidden');
});


signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    
    if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    const userExists = users.some(user => user.email === email);
    
    if (userExists) {
        alert('Email already registered!');
        return;
    }
    
    users.push({
        name: name,
        email: email,
        password: password
    });
    
    localStorage.setItem('users', JSON.stringify(users));
    
    signupMessage.classList.remove('hidden');
    signupForm.reset();
    
    setTimeout(() => {
        signupMessage.classList.add('hidden');
        signupContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
    }, 2000);
});


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showHomePage(user.name);
        loginForm.reset();
    } else {
        alert('Invalid email or password!');
    }
});


logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    navbar.style.display = 'none';
    homeContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    loginForm.reset();
    signupForm.reset();
});


checkLoggedInUser();