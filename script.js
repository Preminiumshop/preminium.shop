// Firebase Config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const grid = document.getElementById('grid');
const addButton = document.getElementById('addButton');
const modal = document.getElementById('modal');
const submitButton = document.getElementById('submit');
const nicknameInput = document.getElementById('nickname');
const messageInput = document.getElementById('message');

// Load messages from Firebase
function loadMessages() {
    database.ref('messages').on('value', (snapshot) => {
        grid.innerHTML = '';
        const messages = snapshot.val();
        for (const id in messages) {
            const { nickname, message } = messages[id];
            addMessageToGrid(nickname, message);
        }
    });
}

// Add message to Firebase
function saveMessage(nickname, message) {
    database.ref('messages').push({ nickname, message });
}

// Add message to the grid
function addMessageToGrid(nickname, message) {
    const box = document.createElement('div');
    box.className = 'box';
    box.innerHTML = `<strong>${nickname}</strong><p>${message}</p>`;
    grid.appendChild(box);
}

// Event listeners
addButton.addEventListener('click', () => {
    modal.classList.add('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

submitButton.addEventListener('click', () => {
    const nickname = nicknameInput.value.trim();
    const message = messageInput.value.trim();

    if (nickname.length > 10) {
        alert('Nickname must be 10 characters or less.');
        return;
    }

    if (nickname && message) {
        saveMessage(nickname, message);
        nicknameInput.value = '';
        messageInput.value = '';
        modal.classList.remove('active');
    } else {
        alert('Please fill in both fields!');
    }
});

// Initialize
loadMessages();
