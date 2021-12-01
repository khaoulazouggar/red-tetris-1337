import { socket } from "./socket";

const initSocket = () => {
    socket.on("connect", () => {
        console.log("connected");
    });
    socket.on("disconnect", () => {
        console.log("disconnected");
    });
}

export default initSocket;