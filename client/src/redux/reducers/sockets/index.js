const initialState = {
	socket: null,
	connected: false,
	tetriminos: [],
	rooms: []
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
		default:
			return state;
	}
};