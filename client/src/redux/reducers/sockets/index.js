import Stage from "../../../Components/Stage";

const initialState = {
	socket: null,
	userName: '',
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
		case 'NEW_PLAYER':
			return { ...state, userName: action.userName }
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
				console.log(state,'okokoko')
				return { ...state, Stages: [...state.Stages, action.Stages] }
			}
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