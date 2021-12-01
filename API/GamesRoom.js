class GamesRoom {
    joinRoom = (socket, room) => {
        return new Promise((resolve, reject) => {
            socket.join(room, () => {
                resolve(true);
            });
        });
    }

    leaveRoom = (socket, room) => {
        return new Promise((resolve, reject) => {
            socket.leave(room, () => {
                resolve(true);
            });
        });
    }
}

module.exports = GamesRoom;