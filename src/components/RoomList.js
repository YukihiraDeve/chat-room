import React, { useState } from 'react';

function RoomList({ rooms, joinRoom }) {
  const [passwords, setPasswords] = useState({});

  const updatePassword = (roomName, value) => {
    setPasswords({ ...passwords, [roomName]: value });
  };

  return (
    <div className='mb-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg opacity-70'>
      <h2 className='text-2xl font-bold mb-3'>Available Rooms</h2>
      <ul className="menu bg-base-100 dark:bg-gray-900 p-2 rounded-box">
        {rooms.map((room, index) => (
          <li key={index} className="hover:bg-base-200 dark:hover:bg-gray-700 p-2 rounded flex justify-between items-center">
            <a onClick={() => joinRoom(room.name, room.hasPassword ? passwords[room.name] : '')} className="flex-1 cursor-pointer">
              {room.name} {room.hasPassword && <span className="ml-2 text-red-500">🔒</span>}
            </a>
            {room.hasPassword && (
              <input
                type="password"
                placeholder="Password"
                value={passwords[room.name] || ''}
                onChange={(e) => updatePassword(room.name, e.target.value)}
                className="input input-xs input-bordered ml-2 dark:bg-gray-700 dark:text-white"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;
