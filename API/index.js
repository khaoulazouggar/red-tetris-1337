const express = require("express");
// const chalk = require('chalk');
const app = express();
const PORT = process.env.PORT || 1337;
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const GamesRoom = require("./GamesRoom");
const Players = require("./Players");
const Tetrimios = require("./Tetrimios");
let rooms = [];
let players = [];
let Games = new GamesRoom();
let player = new Players();
let tetrimios = new Tetrimios();

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization"],
  },
  path: "/socket",
});

// const io = socketio(server);

app.use(cors());
app.get("/rooms", (req, res) => {
  console.log("-----------", rooms);
  res.send(rooms);
});

io.on("connection", async (socket) => {
  console.log("a user connected", socket.id);
  try {
    socket.sendBuffer = [];
    console.log("Client Connected From", socket.handshake.headers.origin);
  } catch (e) {
    console.log(e.message);
  }

  socket.on("new_user", (data) => {
    player
      .newPlayer(data.username, socket.id, players)
      .then(() => {
        socket.emit("welcome");
      })
      .catch((err) => {
        socket.emit("welcome_error");
      });
  });
  socket.on("disconnect", () => {
    // Games.deletePlayer(socket.id, players)
    Games.leaveRoom(io, socket, rooms, players).then((res) => {
      console.log("disconnect", res);
      Games.deletePlayer(socket, players);
    });
    console.log("Client Disconnected");
    // console.log("Rooma", io.sockets.adapter);
  });
  socket.on("send_message", async (data) => {
    console.log("Message Received", data);
    Games.sendMessage(io, data);
    io.emit("message", data);
  });
  socket.on("create_room", async (data) => {
    console.log("Room Created", data);
    rooms = [...rooms, data];
    Games.createRoom(io, socket, data, players);
    io.emit("room_created", data);
  });
  socket.on("join_room", (data) => {
    Games.joinRoom(io, socket, data, players);
    io.emit("room_joined", data);
  });
  socket.on("leaveRoom", () => {
    Games.leaveRoom(io, socket, rooms, players);
  });
  socket.on("startgame", async (data) => {
    Games.getUser(io, socket.id, data.room, players).then(async (user) => {
      if (user.admin) {
        const tetriminos = await tetrimios.getTetriminos();
        Games.startGame(io, data.room, tetriminos);
      } else {
        io.to(socket.id).emit("wait_admin");
      }
    });
    io.emit("game_started");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
