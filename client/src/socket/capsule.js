import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StartGame, newTetriminos, getRoomPlayerslist, getChatMessages } from "../redux/actions/sockets/socketsActions"
import { socket } from "./socket";

const Socketscapsule = (props) => {
	const { tetriminos } = props;

	useEffect(() => {
		// listen for starting the Game
		socket.on("startGame", (tetris) => {
			props.StartGame(tetris)
		});
		// get the new tetriminos from the server and update the state with it
		socket.on("newTetriminos", (tetris) => {
			props.newTetriminos(tetris, tetriminos);
		})
		// Listen for the room Players list
		socket.on("roomPlayers", (playersList) => {
			props.getRoomPlayerslist(playersList);
		});
		// Chat Listener
		socket.on("chat", (message) => {
			props.getChatMessages(message);
		});


		// Clean up the event listeners
		return () => {
			socket.off("startGame");
			socket.off("newTetriminos");
			socket.off("roomPlayers");
			socket.off("chat");
		}
	}, [props])

	return props.children
}

const mapStateToProps = (state) => ({
	sockets: state.sockets,
	tetriminos: state.sockets.tetriminos
})

const mapDispatchToProps = { StartGame, newTetriminos, getRoomPlayerslist, getChatMessages }

export default connect(mapStateToProps, mapDispatchToProps)(Socketscapsule)