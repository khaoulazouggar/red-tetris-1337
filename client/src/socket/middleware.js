import { socket } from "./socket";


const socketMiddleware = () => {
	socket.on("connect", () => {
		console.log("connected");
	});

	socket.on("disconnect", () => {
		console.log("disconnected");
	});
	return next => action => {
		next(action);
	};
}

export default socketMiddleware;