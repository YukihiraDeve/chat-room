import React, { useState, useEffect, useRef } from 'react';

function ChatRoom({ room, userName, sendMessage }) {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const send = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      send();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [room.messages]);

  return (
    <div className='p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg opacity-70'>
      <h2 className='text-2xl font-bold mb-3'>{room.name}</h2>
      <div className='bg-gray-100 dark:bg-gray-900 p-4 rounded-box h-96 overflow-y-auto'>
        {room.messages.map((msg, index) => (
          <div key={index} className={`message mb-2 p-2 rounded-lg ${msg.userName === userName ? 'ml-auto bg-blue-100 dark:bg-blue-700' : 'mr-auto bg-gray-200 dark:bg-gray-700'}`}>
            <p className='text-sm font-semibold'>{msg.userName}</p>
            <p className='p-2 rounded-lg'>{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className='mt-4'>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="input input-bordered w-full mb-2 dark:bg-gray-700 dark:text-white"
          placeholder="Type a message..."
        />
        <button onClick={send} className="btn btn-primary w-full">Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
