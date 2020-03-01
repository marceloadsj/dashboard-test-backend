const express = require("express");
const cors = require("cors");
const packageJson = require("./package.json");
const socketIo = require("socket.io");
const http = require("http");
require("dotenv").config();

const userRoutes = require("./domains/user/userRoutes");
const userSockets = require("./domains/user/userSockets");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    version: packageJson.version,
    uptime: process.uptime()
  });
});

app.use("/user", userRoutes);

const server = http.createServer(app);
const io = socketIo(server, { origins: "*:*" });

userSockets(io);

server.listen(process.env.PORT, () => {
  console.log(
    `Dashboard Test Backend listening on http://localhost:${process.env.PORT}`
  );
});
