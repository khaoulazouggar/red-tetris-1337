class GamesRoom {
	/*
	 ** Get Room Users List
	 */
	getClient = (io, room, players) => {
		return new Promise((resolve, reject) => {
			const player = [];
			const roomList = [];
			const clientsList = io.sockets.adapter.rooms.get(room);
			for (const clientId of clientsList) {
				player.push(clientId);
			}
			for (let i = 0; i < players.length; i++) {
				for (let j = 0; j < player.length; j++) {
					if (players[i].socketId === player[j]) {
						roomList.push(players[i].name);
					}
				}
			};
			io.to(room).emit("roomPlayers", roomList);
		});
	};
	/*
	 ** Get user from room
	 */
	getUser = (io, socketId, room, players) => {
		return new Promise((resolve, reject) => {
			const player = [];
			let Admin;
			const clientsList = io.sockets.adapter.rooms.get(room);
			for (const clientId of clientsList) {
				player.push(clientId);
			}
			for (let i = 0; i < player.length; i++) {
				if (player[i] === socketId) Admin = players.find((player) => player.socketId === socketId);
			}
			resolve(Admin);
		});
	};
	/*
	 **  Tells the room that a player has joined
	 */
	joinedRoomMessage = (io, room, name, message) => {
		return new Promise((resolve, reject) => {
			const data = { name: name, message: message, type: "joined" };
			this.sendMessage(io, { name: name, message: message, type: "joined" });
			// io.to(room).emit('playersJoined', message);
		});
	};
	/*
	 ** Creates a new room
	 */
	createRoom = (io, socket, room, players) => {
		return new Promise(async (resolve, reject) => {
			const player = players.filter((plyr) => plyr.socketId === socket.id);
			player[0].admin = true;
			player[0].room = room;
			socket.join(room);
			if (io.to(room).emit("chat", { message: `${player[0]?.name} joined ${room}`, type: "joined" })) resolve(true)
			this.getClient(io, room, players);

		});
	};
	/*
	 ** Join Room already created
	 */
	joinRoom = (io, socket, room, players) => {
		return new Promise((resolve, reject) => {
			const player = players.filter((plyr) => plyr.socketId === socket.id);
			player[0].room = room;
			console.log("players in room", players);
			socket.join(room);
			this.getClient(io, room, players);
			io.to(room).emit("chat", { message: `${player[0]?.name} joined ${room}`, type: "joined" });
		});
	};
	/*
	 **  Tells the room that a player has left
	 */

	leaveRoom = (io, socket, rooms, players) => {
		return new Promise((resolve, reject) => {
			const playerremoved = players.find((player) => player.socketId === socket.id);
			const room = playerremoved?.room;
			const Admin = playerremoved?.admin;
			if (room) {
				console.log("madkheltch");
				socket.leave(room);
				io.to(room).emit("chat", { message: `${playerremoved.name} Left the room`, type: "left" });
				const player = players.filter((plyr) => plyr.socketId === socket.id);
				player[0].admin = false;
				player[0].room = "";
				const playersinRoom = players.filter((plyr) => plyr.room === room);
				if (Admin && playersinRoom.length > 0) {
					playersinRoom[0].admin = true;
					io.to(room).emit("chat", { message: `${playersinRoom[0].name} is the Admin now`, type: "admin" });
					resolve(true);
				} else {
					const newrooms = rooms.filter((rm) => rm !== room);
					socket.emit("update_roomList", newrooms);
					rooms = newrooms;
					resolve(true);
				}
			} else {
				resolve(true);
			}
		});
	};
	/*
	 ** Delete Player from players list
	 */
	deletePlayer = (socket, players) => {
		return new Promise((resolve, reject) => {
			const player = players.filter((plyr) => plyr.socketId !== socket.id);
			players = player;
		});
	};
	/*
	 ** Starts the game
	 */
	startGame = (io, room, Tetrimios) => {
		return new Promise((resolve, reject) => {
			io.to(room).emit("startGame", Tetrimios);
		});
	};
	newTetriminos = (io, room, Tetrimios) => {
		return new Promise((resolve, reject) => {
			io.to(room).emit("newTetriminos", Tetrimios);
		});
	};
	/*
	 ** Send Message to Room
	 */
	sendMessage = (io, data) => {
		return new Promise((resolve, reject) => {
			io.to(data.room).emit("chat", { name: data.name, message: data.message, type: data.type });
			resolve(true);
		});
	};
}

module.exports = GamesRoom;
