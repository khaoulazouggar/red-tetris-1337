class Players {
	// constructor(client) {
	newPlayer = async (name, socketId, players) => {
		console.log(`${name} joined the game`);
		console.log(`${name}'s socket id is ${socketId}`);
		players.push({
			name,
			socketId,
			admin: false,
			room: "",
		});
		return players;
	};
	deletePlayer = async (socketId, players) => {
		console.log(`${socketId} left the game `);
		players = await players.filter((player) => player.socketId !== socketId);
		return players;
	};
}

module.exports = Players;
