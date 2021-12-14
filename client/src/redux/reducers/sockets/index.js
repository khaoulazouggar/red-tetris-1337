import Stage from "../../../Components/Stage";

const initialState = {
	userexists: null,
	socket: null,
	userName: '',
	roomname: '',
	connected: false,
	tetriminos: [],
	rooms: [],
	roomPlayers: [],
	chat: [],
	Stages: []
}

export const sockets = (state = initialState, action) => {
	switch (action.type) {
		case 'SOCKET_CONNECT':
			return {
				...state,
				connected: true,
				socket: action.socket,
			};
		case 'SOCKET_DISCONNECT':
			return {
				...state,
				connected: false,
				socket: null,
			};
		case 'NEW_TETRIMINOS':
			return {
				...state,
				gameStarted: true,
				tetriminos: action.tetriminos,
			};
		case 'USER_EXISTS':
			return {...state, userexists: action.userexists}
		case 'NEW_PLAYER':
			return { ...state, userName: action.userName }
		case 'NEW_ROOM':
			return { ...state, roomname: action.roomname }
		case 'START_GAME':
			return {
				...state,
				gameStarted: true,
				tetriminos: action.tetriminos,
			};
		case 'SET_ROOMS':
			return {
				...state,
				rooms: action.rooms
			}
		case 'ADD_STAGES':
			{
				return { ...state, Stages: action.Stages }
			}
		case 'UPDATE_STAGES':
			return { ...state, Stages: action.Stages }
		case 'ROOM_PLAYERS_LIST':
			return {
				...state,
				roomPlayers: action.roomPlayers
			}
		case 'CHAT_MESSAGES':
			return {
				...state,
				chat: [...state.chat, action.messages]
			}
		case 'CLEAR_CHAT_MESSAGES':
			return {
				...state,
				chat: []
			}




		case 'CLEAR_ALL_STATE':
			return {
				...state,
				gameStarted: false,
				userName: '',
				tetriminos: [],
				rooms: [],
				roomPlayers: [],
				chat: [],
				Stages: []
			}
		default:
			return state;
	}
};