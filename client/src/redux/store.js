import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import socketMiddleware from "../socket/middleware"

const initialState = {}

const middleware = [thunk];


const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(socketMiddleware, ...middleware))
);

export default store;