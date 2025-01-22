let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let username = localStorage.getItem('username') || 'Guest';

// Load chat history on page load
document.addEventListener("DOMContentLoaded", () => {
    updateAuthButton();
    loadChatHistory();
});

function showLogin() {
    document.body.innerHTML += `
<div class='popup'>
    <h2>Login</h2>
    <input type='text' id='username' placeholder='Username'>
    <input type='password' id='password' placeholder='Password'>
    <button onclick='loginSuccess()'>Login</button>
    <button onclick='closePopup()'>Cancel</button>
</div>`;
}

function loginSuccess() {
    let userInput = document.getElementById('username').value.trim();
    if (userInput) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', userInput);
        isLoggedIn = true;
        username = userInput;
        updateAuthButton();
        closePopup();
    } else {
        alert('Please enter a valid username.');
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('chatHistory');
    isLoggedIn = false;
    username = 'Guest';
    updateAuthButton();
    document.getElementById('chat-box').innerHTML = "";
}

function updateAuthButton() {
    let authBtn = document.getElementById('auth-btn');
    let historyList = document.getElementById('history-list');

    if (isLoggedIn) {
        authBtn.innerText = 'Logout';
        authBtn.setAttribute('onclick', 'logout()');
        historyList.innerHTML = `<li>User: ${username}</li>`;
    } else {
        authBtn.innerText = 'Login';
        authBtn.setAttribute('onclick', 'showLogin()');
        historyList.innerHTML = '';
    }
}

function closePopup() {
    document.querySelector('.popup').remove();
}

function sendMessage() {
    let inputField = document.getElementById('user-input');
    let message = inputField.value.trim();
    let chatBox = document.getElementById('chat-box');

    if (message) {
        let userMessage = `<p><strong>${username}:</strong> ${message}</p>`;
        chatBox.innerHTML += userMessage;
        saveToChatHistory(userMessage);
        inputField.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;

        // Simulate chatbot response after a delay
        setTimeout(() => {
            chatbotResponse(message);
        }, 1000);
    } else {
        alert("Please enter a message.");
    }
}

// Define bulk responses
let bulkResponses = {
    "hello": "Hello! How can I assist you today?",
    "how are you": "I'm just a bot, but I'm doing great! Thanks for asking.",
    "bye": "Goodbye! Have a wonderful day!",
    "what is your name": "I'm ThinkBot, your friendly chatbot assistant.",

    "who created you": "I was created by a talented developer Mayank!",
    "what can you do": "I can chat with you and keep you entertained!",
    "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!"
};

// Function to add bulk responses dynamically
function addBulkResponses(newResponses) {
    bulkResponses = { ...bulkResponses, ...newResponses };
    alert("Responses added successfully!");
}

// Modify chatbot response function to use bulk responses
function chatbotResponse(userMessage) {
    let chatBox = document.getElementById('chat-box');
    let lowerCaseMessage = userMessage.toLowerCase();
    let botResponse = bulkResponses[lowerCaseMessage] || bulkResponses["default"];

    let botMessage = `<p><strong>ThinkBot:</strong> ${botResponse}</p>`;
    chatBox.innerHTML += botMessage;
    saveToChatHistory(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Example: Adding new responses in bulk
addBulkResponses({
    "who created you": "I was created by a talented developer!",
    "what can you do": "I can chat with you and keep you entertained!",
    "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!"
});

// Save chat messages to localStorage
function saveToChatHistory(message) {
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.push(message);
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Load chat messages from localStorage
function loadChatHistory() {
    let chatBox = document.getElementById('chat-box');
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.forEach(msg => {
        chatBox.innerHTML += msg;
    });
    chatBox.scrollTop = chatBox.scrollHeight;
}