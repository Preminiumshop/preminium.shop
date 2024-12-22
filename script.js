document.addEventListener('DOMContentLoaded', () => {
    // Firebase Configuration
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
    const app = firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    // DOM Elements
    const messageForm = document.getElementById('messageForm');
    const nicknameInput = document.getElementById('nickname');
    const messageInput = document.getElementById('message');
    const grid = document.getElementById('grid');

    // Load messages from Firebase
    function loadMessages() {
        database.ref('messages').on('value', (snapshot) => {
            grid.innerHTML = ''; // Clear existing messages
            const messages = snapshot.val();
            if (messages) {
                Object.values(messages).forEach(({ nickname, message }) => {
                    addMessageToGrid(nickname, message);
                });
            }
        });
    }

    // Save message to Firebase
    function saveMessage(nickname, message) {
        const newMessageKey = database.ref().child('messages').push().key;
        const updates = {};
        updates[`/messages/${newMessageKey}`] = { nickname, message };
        return database.ref().update(updates);
    }

    // Add message to grid
    function addMessageToGrid(nickname, message) {
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = `<strong>${nickname}</strong><p>${message}</p>`;
        grid.appendChild(box);
    }

    // Form submission
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nickname = nicknameInput.value.trim();
        const message = messageInput.value.trim();

        if (nickname.length > 10) {
            alert('Nickname must be 10 characters or less.');
            return;
        }

        if (nickname && message) {
            saveMessage(nickname, message)
                .then(() => {
                    nicknameInput.value = '';
                    messageInput.value = '';
                })
                .catch((error) => {
                    console.error('Error saving message:', error);
                });
        } else {
            alert('Please fill in both fields!');
        }
    });

    // Load existing messages on page load
    loadMessages();
});
