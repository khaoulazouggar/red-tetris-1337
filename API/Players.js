class Players {
	// constructor(client) {
	newPlayer = async (io, name, socketId, players) => {
		console.log(`${name} joined the game`);
		console.log(`${name}'s socket id is ${socketId}`);
		const player = players.find(p => p.name === name);

		if (player && player.name) {
			io.to(socketId).emit("useralready_exist", { res: true })
		}
		else {
			players.push({
				name,
				socketId,
				admin: false,
				room: "",
			});
			io.to(socketId).emit("useralready_exist", { res: false })
		}
		return players;
	};
	deletePlayer = async (playerremoved, players) => {
		const newplayers = await players.filter((player) => player.socketId !== playerremoved.socketId);
		return newplayers;
	};
	updatePlayer = async (io, socket, data, players) => {
		// const plyr = players.find(p => p.socketId === socket.socketId && p.name )
		const newplayers = await players.filter((player) => {player.name !== data.username && player.socketId !== socket.id});
		newplayers.push({
			name: data.username,
			socketId: socket.id,
			admin: false,
			room: "",
		});
		return newplayers
	}
}

module.exports = Players;
