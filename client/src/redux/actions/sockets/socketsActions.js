import Stage from "../../../Components/Stage"
import Api from "../../../socket/Api"

/*---------------------------------- Sockets Actions ----------------------------------------------------*/

/* 
** Set new  player
*/
export const newPLayer = (username) => {
	return (dispatch) => {
		dispatch({
			type: 'NEW_PLAYER',
			userName: username
		})
	}
}

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
** Set Stages in multiple game
*/

export const setStages = (Stages, stage) => {
	return (dispatch) => {
		if (Stages.length === 0)
			dispatch({
				type: 'ADD_STAGES',
				Stages: stage
			})
		else {
			let Stg = Stages.find(stg => stg.username === stage.username)
			console.log("---------------- Stage 11111----------------", Stg);
			Stg = stage
			console.log("---------------- Stage 22222----------------", Stg);
			dispatch({
				type: 'ADD_STAGES',
				Stages: Stg
			})
			// console.log("-----------------------Stages 2-------------------------");
			// console.log(Stages);
			// console.log("-----------------------Stages 2-------------------------");
		}
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

