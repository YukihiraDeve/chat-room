import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import CreateRoom from './components/CreateRoom';
import RoomList from './components/RoomList';
import ChatRoom from './components/ChatRoom';

import './App.css';

const socket = io('http://localhost:4000');

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [userName, setUserName] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    socket.on('roomList', (rooms) => {
      setRooms(rooms);
    });

    socket.on('message', (message) => {
      if (currentRoom && message.roomName === currentRoom.name) {
        setCurrentRoom(prev => ({ ...prev, messages: [...prev.messages, message] }));
      }
    });

    return () => {
      socket.off('roomList');
      socket.off('message');
    };
  }, [currentRoom]);

  const joinRoom = (roomName, password) => {
    if (!userName) {
      alert('Please enter a username');
      return;
    }
    socket.emit('joinRoom', { roomName, password, userName });
    setCurrentRoom({ name: roomName, messages: [] });
  };

  const sendMessage = (message) => {
    if (message && currentRoom) {
      socket.emit('sendMessage', { roomName: currentRoom.name, message, userName });
    }
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white relative">
        <div className="container mx-auto px-4 py-6 opacity-70 ">
          <h1 className="text-3xl font-bold text-center mb-6">Chat Rooms</h1>
          <div className="flex justify-end mb-4">
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="mb-4">
                <label htmlFor="userName" className="block mb-2">Your Username:</label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="input input-bordered w-full text-blue-600"
                  placeholder="Enter your username"

                />
              </div>
              <CreateRoom socket={socket} setRooms={setRooms} />
              <RoomList rooms={rooms} joinRoom={joinRoom} />
            </div>
            <div className="md:col-span-2">
              {currentRoom ? (
                <ChatRoom room={currentRoom} userName={userName} sendMessage={sendMessage} />
              ) : (
                <div className="text-center">
                  <h2 className="text-xl">Join a room to start chatting!</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
