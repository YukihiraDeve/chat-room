const rooms = {};

const createRoom = (name, password) => {
  if (!rooms[name]) {
    rooms[name] = { name, password, createdAt: new Date(), users: new Set() };
    return rooms[name];
  }
  return null;
};

const getRoom = (name) => {
  return rooms[name];
};

const getRooms = () => {
  return Object.values(rooms).map(room => ({
    name: room.name,
    hasPassword: !!room.password
  }));
};

const cleanUp = () => {
  const now = new Date();
  Object.keys(rooms).forEach(name => {
    if (now - rooms[name].createdAt > 5 * 60 * 1000 && rooms[name].users.size === 0) {
      delete rooms[name];
    }
  });
};

module.exports = { createRoom, getRoom, getRooms, cleanUp };