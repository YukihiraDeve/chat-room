import React, { useState } from 'react';

function CreateRoom({ socket, setRooms }) {
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');

  const createRoom = () => {
    if (!roomName) {
      alert('Please enter a room name');
      return;
    }
    socket.emit('createRoom', { roomName, password });
    setRoomName('');
    setPassword('');
  };

  return (
    <div className='mb-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg opacity-70'>
      <h2 className='text-2xl font-bold mb-3'>Create Room</h2>
      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="input input-bordered w-full mb-2 dark:bg-gray-700 dark:text-white"
      />
      <input
        type="text"
        placeholder="Password (optional)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full mb-2 dark:bg-gray-700 dark:text-white"
      />
      <button onClick={createRoom} className="btn btn-primary w-full">Create</button>
    </div>
  );
}

export default CreateRoom;
