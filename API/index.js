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
			.newPlayer(io, data.username, socket.id, players)
			.then(() => {
				socket.emit("welcome");
			})
			.catch((err) => {
				socket.emit("welcome_error");
			});
	});

	socket.on("create_user_room", async (data) => {
		const plyr = players.find(p => p.name === data.username && p.socketId === socket.id);
		if (plyr === undefined)
			player.updatePlayer(io, socket, data, players)
				.then(res => {
					players = res
					const rm = rooms.find(room => room === data.room)
					if (rm === undefined) {
						rooms = [...rooms, { name: data.room, state: false, mode: "solo", maxplayers: 1, players: 1 }];
						Games.createRoom(io, socket, data.room, players)
					}
					else {
						Games.joinRoom(io, socket, data.room, players);
					}
				})
	})
	socket.on("disconnect", () => {
		Games.leaveRoom(io, socket, rooms, players).then((res) => {
			if (res.status) {
				rooms = res.rooms
				player.deletePlayer(res.playerremoved, players)
					.then(res => {
						players = res
					})
			}
		});
	});
	socket.on("send_message", async (data) => {
		Games.sendMessage(io, data);
		io.emit("message", data);
	});
	socket.on("create_room", async (data) => {
		rooms = [...rooms, { name: data, state: false, mode: "solo", maxplayers: 1, players: 1 }];
		Games.createRoom(io, socket, data, players)
		io.emit("update_rooms", rooms)
	});
	socket.on("join_room", (data) => {
		Games.joinRoom(io, socket, data, rooms, players);
		io.emit("room_joined", data);
	});
	socket.on("leaveRoom", () => {
		Games.leaveRoom(io, socket, rooms, players)
			.then(res => {
				if (res.status) rooms = res.rooms
			})
	});
	socket.on("startgame", async (data) => {
		const room = rooms.find(room => room.name === data.room)
		Games.getUser(io, socket.id, room, players).then(async (user) => {
			if (user.admin) {
				const tetriminos = await tetrimios.getTetriminos();
				Games.startGame(io, room, tetriminos);
				io.emit("update_rooms", rooms)
			} else {
				io.to(socket.id).emit("wait_admin");
			}
		});
		io.emit("game_started");
	});
	socket.on("newTetriminos", async (data) => {
		const tetriminos = await tetrimios.getTetriminos();
		Games.newTetriminos(io, data.room, tetriminos);
	})

	socket.on("Stage", (data) => {
		Games.sendStage(io, data.roomName, data.stage, data.username);
	});

	socket.on("checkStages", async (data) => {
		Games.checkStages(io, data.Stages, data.stage, data.room)
	})

	socket.on("updateroomMode", async data => {
		Games.updateroomMode(io, data, rooms)
	})
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
