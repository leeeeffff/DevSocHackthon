import React, { useState } from 'react';
import '../style/Chat.css'; // Make sure this file exists
import Navbaradvice from '../components/Navbaradvice';
import Profile from '../assests/images/profile.png'; // Profile image import

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent sending empty input

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Display user input immediately

    setInput(''); // Clear input field

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      if (data.response) {
        const aiMessage = { role: 'ai', content: data.response };
        setMessages((prevMessages) => [...prevMessages, aiMessage]); // Add AI response
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage = { role: 'ai', content: 'Error: Unable to fetch response. Please try again.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div>
      <Navbaradvice />
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message-container ${msg.role}`}>
              {msg.role === 'user' && (
                <img src={Profile} alt="User" className="profile-pic" />
              )}
              <div className={`message ${msg.role}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="chat-input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="chat-input"
          />
          <button type="submit" className="chat-send-button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
