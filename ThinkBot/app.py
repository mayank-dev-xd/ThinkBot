from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# Sample responses (this is where you can expand your chatbot's logic)
responses = {
    "hi": "Hello! How can I help you?",
    "how are you?": "I'm just a bot, but I'm doing great!",
    "bye": "Goodbye! Have a great day!"
}

# Default response if the message doesn't match any predefined ones
default_responses = [
    "Sorry, I didn't understand that.",
    "Can you please rephrase?",
    "I'm not sure what you mean."
]

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message').lower()
    reply = responses.get(user_message, random.choice(default_responses))
    return jsonify({"reply": reply})

if __name__ == '__main__':
    app.run(debug=True)
