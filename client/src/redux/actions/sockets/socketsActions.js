import Api from "../../../socket/Api"

/*---------------------------------- Sockets Actions ----------------------------------------------------*/

/*
** Get room List
*/

export const getRooms = () => {
	return (dispatch) => {
		Api()
			.get("/rooms")
			.then((res) => {
				console.log(res.data);
				dispatch({
					type: "SET_ROOMS",
					rooms: res.data
				})
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

/*
** Get room players List
*/
export const getRoomPlayerslist = (players) => {
	return (dispatch) => {
		dispatch({
			type: 'ROOM_PLAYERS_LIST',
			roomPlayers: players
		})
	}
}
/*
** start the game
*/
export const StartGame = (tetriminos) => {
	return (dispatch) => {
		console.log(tetriminos);
		dispatch({
			type: 'START_GAME',
			tetriminos
		})
	}
}

/* 
** Get new Tetriminos in startred game
*/
export const newTetriminos = (tetris, tetriminos) => {
	return (dispatch) => {
		let newTetris = []
		dispatch({
			type: 'NEW_TETRIMINOS',
			tetriminos: newTetris.concat(tetriminos, tetris),
		})
	}
}


/*
** Get Chat Messages
*/
export const getChatMessages = (messages) => {
	return (dispatch) => {
		dispatch({
			type: 'CHAT_MESSAGES',
			messages
		})
	}
}

/*
** Clear Chat Messages
*/
export const clearChatMessages = () => {
	return (dispatch) => {
		dispatch({
			type: 'CLEAR_CHAT_MESSAGES'
		})
	}
}

/*
** Clear All State
*/
export const clearAllState = () => {
	return (dispatch) => {
		dispatch({
			type: 'CLEAR_ALL_STATE'
		})
	}
}