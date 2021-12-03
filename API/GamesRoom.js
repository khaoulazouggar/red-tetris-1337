class GamesRoom {
    /*
    ** Get Room Users List
    */
    getClient = (io, room, players) => {
        return new Promise((resolve, reject) => {
            const player = []
            const roomList = []
            const clientsList = io.sockets.adapter.rooms.get(room)
            for (const clientId of clientsList) {
                player.push(clientId)
            }
            for (let i = 0; i < player.length; i++) {
                if (player[i] === players[i].socketId)
                    roomList.push(players[i].name);
            }
            console.log(roomList, "roomList");
            io.to(room).emit('roomPlayers', roomList);
        });

    }
    /*
    **  Tells the room that a player has joined
    */
    joinedRoomMessage = (io, room, message) => {
        return new Promise((resolve, reject) => {
            io.to(room).emit('playersJoined', message);
        });
    }
    /*
    ** Join Room already created
    */
    joinRoom = (io, socket, room, players) => {
        return new Promise((resolve, reject) => {
            const player = players.filter(plyr => plyr.socketId === socket.id)
            console.log(players.some(plyr => plyr.socketId === socket.id));
            socket.join(room);
            this.getClient(io, room, players);
            this.joinedRoomMessage(io, room, `${player[0].name} joined ${room}`);
        });
    }
    /*
    ** Leave Room
    */
    leaveRoom = (socket, room) => {
        return new Promise((resolve, reject) => {
            socket.leave(room, () => {
                resolve(true);
            });
        });
    }
    /*
    ** Send Message to Room
    */
    sendMessage = (io, data) => {
        return new Promise((resolve, reject) => {
            io.to(data.room).emit('chat', {name: data.name, message: data.message});
            resolve(true);
        });
    }
}

module.exports = GamesRoom;