const grid = document.getElementById('grid');
const addButton = document.getElementById('addButton');
const modal = document.getElementById('modal');
const submitButton = document.getElementById('submit');
const nicknameInput = document.getElementById('nickname');
const messageInput = document.getElementById('message');

// Load messages from localStorage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach(({ nickname, message }) => addMessageToGrid(nickname, message));
}

// Save messages to localStorage
function saveMessage(nickname, message) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ nickname, message });
    localStorage.setItem('messages', JSON.stringify(messages));
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

    if (nickname && message) {
        addMessageToGrid(nickname, message);
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
