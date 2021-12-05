import socketIOClient from "socket.io-client";


export const socket = socketIOClient("http://localhost:1337", {
    path: "/socket",
});

export const GetTetris = () => {
   return new Promise((resolve, reject) => {
    socket.on("startGame", (tetriminos) => {
        console.log("startGame", tetriminos);
        resolve(tetriminos);
      });
    });
}
