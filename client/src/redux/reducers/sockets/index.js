const initialState = {
	socket: null,
	connected: false,
	tetriminos: [],
}

export const socketreducers = (state = initialState, action) => {
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
		case 'START_GAME':
			return {
				...state,
				gameStarted: true,
				tetriminos: action.tetriminos,
			};
		default:
			return state;
	}
};