class Players {
    // constructor(client) {
    newPlayer = async (name, socketId, players) => {
        console.log(`${name} joined the game`);
        console.log(`${name}'s socket id is ${socketId}`);
        players.push({
            name,
            socketId
        });
        return players;
    }
    deletePlayer = async (socketId, players) => {
        const player = await players.filters({
            socketId
        });
        return player;
    }

}


module.exports = Players;