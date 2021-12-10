import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StartGame, newTetriminos, getRoomPlayerslist } from "../redux/actions/sockets/socketsActions"
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
		socket.on("roomPlayers", (data) => {
			props.getRoomPlayerslist(data);
		});
	}, [props])

	return props.children
}

const mapStateToProps = (state) => ({
	sockets: state.sockets,
	tetriminos: state.sockets.tetriminos
})

const mapDispatchToProps = { StartGame, newTetriminos, getRoomPlayerslist }

export default connect(mapStateToProps, mapDispatchToProps)(Socketscapsule)