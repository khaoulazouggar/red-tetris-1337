const express = require('express');
// const chalk = require('chalk');
const app = express();
const PORT = process.env.PORT || 1337;
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const GamesRoom = require('./GamesRoom');
const Players = require('./Players');
let Games = new GamesRoom()
let rooms = []
let players = []
let player = new Players()


const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Authorization"],
    },
    path: '/socket'
});

// const io = socketio(server);

app.use(cors())
app.get("/rooms", (req, res) => {
    console.log("-----------", rooms);
    res.send(rooms);
});

io.on("connection", async (socket) => {
    try {
        socket.sendBuffer = []
        console.log("Client Connected From", socket.handshake.headers.origin);
    }
    catch (e) {
        console.log(e.message)
    }

    socket.on("new_user", data => {
        player.newPlayer(data.username, socket.id, players)
            .then(() => {
                socket.emit("welcome")
            })
            .catch((err) => {
                socket.emit("welcome_error")
            })

        console.log("-----Players-----", players)
    })
    socket.on("disconnect", () => {
        console.log("Client Disconnected");
    })
    socket.on("send_message", async (data) => {
        console.log("Message Received", data);
        Games.sendMessage(io, data)
        io.emit("message", data);
    })
    socket.on("create_room", async (data) => {
        console.log("Room Created", data);
        rooms = [...rooms, data]
        Games.joinRoom(io, socket, data, players)
        io.emit("room_created", data)
    })
    socket.on("join_room", async (data) => {
        console.log("Room Joined", data);
        Games.joinRoom(io, socket, data, players)
        io.emit("room_joined", data);
    })
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

