import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StartGame, newTetriminos } from "../redux/actions/sockets/socketsActions"
import { socket } from "./socket";

const Socketscapsule = (props) => {
    const { tetriminos } = props;

    useEffect(() => {
        socket.on("startGame", (tetris) => {
            props.StartGame(tetris)
        });
        socket.on("newTetriminos", (tetris) => {
            props.newTetriminos(tetris, tetriminos);
        })
    }, [props])

    return props.children
}

const mapStateToProps = (state) => ({
    sockets: state.sockets,
    tetriminos: state.sockets.tetriminos
})

const mapDispatchToProps = { StartGame, newTetriminos }

export default connect(mapStateToProps, mapDispatchToProps)(Socketscapsule)