import { socket } from "./socket";



const socketMiddleware = (dispatch, getState) => {
	socket.on("connect", () => {
		console.log("connected");
	});

	socket.on("disconnect", () => {
		console.log("disconnected");
	});

	socket.on("startGame", (tetris) => {
		console.log("startGame", tetris);
		dispatch({
			type: "START_GAME",
			tetriminos: tetris
		});
		// tetriminos.length > 0 ? setTetriminos([...tetriminos, tetris]) : setTetriminos(tetris);
		// if (tetris.length > 0) {
		// 	setGameStart(true);
		// 	setgetTetrimino(true);
		// }
	});
	return next => action => {
		next(action);
	};
}

export default socketMiddleware;