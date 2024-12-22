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
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    // DOM Elements
    const addButton = document.getElementById('addButton');
    const modal = document.getElementById('modal');
    const submitButton = document.getElementById('submit');
    const nicknameInput = document.getElementById('nickname');
    const messageInput = document.getElementById('message');
    const grid = document.getElementById('grid');

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

    // Save message to Firebase
    function saveMessage(nickname, message) {
        database.ref('messages').push({ nickname, message });
    }

    // Add message to grid
    function addMessageToGrid(nickname, message) {
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = `<strong>${nickname}</strong><p>${message}</p>`;
        grid.appendChild(box);
    }

    // Open Modal
    addButton.addEventListener('click', () => {
        modal.classList.add('active');
    });

    // Close Modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Submit Message
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

    // Load existing messages on page load
    loadMessages();
});
