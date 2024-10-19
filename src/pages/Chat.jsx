import React, { useState, useEffect, useRef } from 'react';
import '../style/Chat.css'; 
import Navbaradvice from '../components/Navbaradvice';
import Profile from '../assests/images/profile.png'; 
import Aipic from '../assests/images/Ai.png'; 
import Shapers from '../assests/images/shape.png'; 
import { useLocation } from 'react-router-dom';


const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null); // Reference to chat box
  const location = useLocation();
  const userId = location.state?.userId;

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
        body: JSON.stringify({ message: input, userId }),
      });

      const data = await res.json();
      if (data.response) {
        const aiMessage = { role: 'ai', content: data.response };
        setMessages((prevMessages) => [...prevMessages, aiMessage]); // Add AI response
      } else if (data.error) {
        const errorMessage = { role: 'ai', content: `Error: ${data.error}` };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage = { role: 'ai', content: 'Error: Unable to fetch response. Please try again.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  // Scroll to the bottom whenever messages are updated
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='backers'>
      <Navbaradvice />
      <img className='shapers' src = { Shapers }/>
        <div className='box'/>
        <div className='box1'/>
        <div className="chat-container">
          <div className="chat-box" ref={chatBoxRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message-container ${msg.role}`}>
                <img 
                  src={msg.role === 'user' ? Profile : Aipic} 
                  alt={msg.role === 'user' ? 'User' : 'AI'} 
                  className={msg.role === 'user' ? 'profile-pic-user' : 'profile-pic-ai'} 
                />
                <div className={`message ${msg.role}`}>{msg.content}</div>
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
