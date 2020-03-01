module.exports = io => {
  io.on("connection", socket => {
    socket.on("userLogged", userName => {
      socket.broadcast.emit("userLogged", userName);
    });
  });
};
