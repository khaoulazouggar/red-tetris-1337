import Api from "../../../socket/Api"
import { socket } from "../../../socket/socket"

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
** USER_ EXISTS
*/
export const userExists = (userexists) => {
	return (dispatch) => {
		dispatch({
			type: 'USER_EXISTS',
			userexists
		})
	}
}
/* 
** Set new  player
*/
export const newRoom = (roomname) => {
	return (dispatch) => {
		dispatch({
			type: 'NEW_ROOM',
			roomname
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
** Update the room list
*/

export const updateRoomList = (rooms) => {
	return (dispatch) => {
		dispatch({
			type: "SET_ROOMS",
			rooms
		})
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

export const setStages = (Stages, stage, roomname) => {
	return (dispatch) => {
		if (Stages.length === 0) {
			Stages.push(stage)
			dispatch({
				type: 'ADD_STAGES',
				Stages: Stages
			})
		}
		else {
			let Stg = Stages.filter(stg => stg.username === stage.username)
			if (Stg[0]?.username)
				Stg[0].stage = stage.stage
			else {
				Stages.push(stage)
				socket.emit("checkStages", { Stages, stage, room: roomname })
			}
			dispatch({
				type: 'ADD_STAGES',
				Stages: Stages
			})

		}
	}
}
/*
** Update stages state on redux
*/
export const updateStages = (Stages) => {
	return (dispatch) => {
		dispatch({ type: 'UPDATE_STAGES', Stages: Stages.Stages })
	}
}

/*
** Delete user from Stages
*/
export const deleteUserfromStages = (username, stages) => {
	return (dispatch) => {
		const newStages = stages.filter(stage => stage.username !== username)
		dispatch({ type: 'UPDATE_STAGES', Stages: newStages })
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

