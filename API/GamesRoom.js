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
	** Get room users list
	*/
	getroomUsers = (io, room, players) => {
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
			resolve(roomList);
		})
	}
	/*
	 ** Get user from room
	 */
	getUser = (io, socketId, room, players) => {
		return new Promise((resolve, reject) => {
			const player = [];
			let Admin;
			const clientsList = io.sockets.adapter.rooms.get(room.name);
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
			console.log("createRoom");
			console.log(room);
			const player = players.filter((plyr) => plyr.socketId === socket.id);
			player[0].admin = true;
			player[0].room = room;
			socket.join(room);
			if (io.to(room).emit("chat", { message: `${player[0]?.name} joined ${room}`, type: "joined" }))
				this.getClient(io, room, players);

		});
	};
	/*
	 ** Join Room already created
	 */
	joinRoom = (io, socket, room, rooms, players) => {
		return new Promise((resolve, reject) => {
			const room_data = rooms.find(rm => rm.name === room)
			console.log("----------------------------room data ---------------------");
			console.log(room_data);
			console.log("----------------------------room data ---------------------");
			this.getroomUsers(io, room, players).then((users) => {
				if (users.length < 5) {
					const player = players.filter((plyr) => plyr.socketId === socket.id);
					player[0].room = room_data.name;
					socket.join(room_data.name);
					this.getClient(io, room_data.name, players);
					console.log("players in room_data.name", players);
					io.to(room_data.name).emit("chat", { message: `${player[0]?.name} joined ${room_data.name}`, type: "joined" });
					room_data.players += 1;
					io.emit("update_rooms", rooms)
				}
				else {
					io.to(socket.id).emit("room_full")
				}
			})

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
				socket.leave(room);
				io.to(room).emit("chat", { message: `${playerremoved.name} Left the room`, type: "left" });
				io.to(room).emit("clearStages", { username: playerremoved.name });
				const player = players.filter((plyr) => plyr.socketId === socket.id);
				const room_data = rooms.find(rm => rm.name === room);
				player[0].admin = false;
				player[0].room = "";
				room_data.players -= 1
				const playersinRoom = players.filter((plyr) => plyr.room === room);
				if (Admin && playersinRoom.length > 0) {
					playersinRoom[0].admin = true;
					io.emit("update_rooms", rooms)
					io.to(room).emit("chat", { message: `${playersinRoom[0].name} is the Admin now`, type: "admin" });
					resolve({ status: true, playerremoved, rooms });
				} else {
					const newrooms = rooms.filter((rm) => rm.name !== room);
					socket.emit("update_roomList", newrooms);
					rooms = newrooms;
					io.emit("update_rooms", rooms)
					resolve({ status: true, playerremoved, rooms });
				}
			} else {
				resolve({ status: true, playerremoved, rooms });
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
			room.state = true;
			io.to(room.name).emit("startGame", Tetrimios);
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
	/*
	** semd Stage state to room
	*/
	sendStage = (io, room, stage, username) => {
		return new Promise((resolve, reject) => {
			io.to(room.name).emit("getstages", { stage, username });
		});
	}
	/*
	** Check Stages state and send it to the rooms
	*/
	checkStages = (io, Stages, stage, room) => {
		return new Promise((resolve, reject) => {
			io.to(room.name).emit("updateStages", { Stages });

		})
	}
	/*
	** Change room mode solo/buttle
	*/
	updateroomMode = (io, data, rooms) => {
		return new Promise((resolve, reject) => {
			const room = rooms.filter(room => room.name === data.roomName);
			room[0].mode = data.mode;
			if (data.mode === "batlle")
				room[0].maxplayers = 5
			else
				room[0].maxplayers = 1
			io.emit("update_rooms", rooms)
		})
	}
}

module.exports = GamesRoom;
