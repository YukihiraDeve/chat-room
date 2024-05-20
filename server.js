const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { createRoom, getRoom, getRooms, cleanUp } = require('./roomsManager');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

app.use(cors());

const PORT = process.env.PORT || 4000;

io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  socket.on('createRoom', ({ roomName, password }) => {
    const room = createRoom(roomName, password);
    if (room) {
      socket.join(room.name);
      io.emit('roomList', getRooms());
    }
  });

  socket.on('joinRoom', ({ roomName, password, userName }) => {
    const room = getRoom(roomName);
    if (room) {
      if (!room.password || room.password === password) {
        socket.join(roomName);
        socket.to(roomName).emit('newUser', userName);
        socket.emit('joinSuccess', { roomName });
      } else {
        socket.emit('joinError', 'Incorrect password');
      }
    } else {
      socket.emit('joinError', 'Room not found');
    }
  });

  socket.on('sendMessage', ({ roomName, message, userName }) => {
    const room = getRoom(roomName);
    if (room) {
      io.to(roomName).emit('message', { roomName, userName, message });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    cleanUp();
    io.emit('roomList', getRooms());
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
