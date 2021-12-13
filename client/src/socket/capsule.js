import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  StartGame,
  newTetriminos,
  getRoomPlayerslist,
  getChatMessages,
  clearAllState,
} from "../redux/actions/sockets/socketsActions";
import { socket } from "./socket";

const Socketscapsule = (props) => {
  const { tetriminos } = props;

  useEffect(() => {
    //initial Socket connection
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
    // listen for starting the Game
    socket.on("startGame", (tetris) => {
      props.StartGame(tetris);
    });
    // get the new tetriminos from the server and update the state with it
    socket.on("newTetriminos", (tetris) => {
      props.newTetriminos(tetris, tetriminos);
    });
    // get players Stages State
    socket.on("getstages", (stage) => {
      // console.log("+++++++++++++++++++++++++++++++++++++++++++", stage);
    });
    // Listen for the room Players list
    socket.on("roomPlayers", (playersList) => {
      props.getRoomPlayerslist(playersList);
    });
    // Chat Listener
    socket.on("chat", (message) => {
      props.getChatMessages(message);
    });

    // Disconnect Listener
    socket.on("disconnect", () => {
      console.log("disconnected");
      props.clearAllState();
    });
    // Clean up the event listeners
    return () => {
      socket.off("startGame");
      socket.off("newTetriminos");
      socket.off("getstages");
      socket.off("roomPlayers");
      socket.off("chat");
      socket.off("disconnect");
    };
  }, [props]);

  return props.children;
};

const mapStateToProps = (state) => ({
  sockets: state.sockets,
  tetriminos: state.sockets.tetriminos,
});

const mapDispatchToProps = { StartGame, newTetriminos, getRoomPlayerslist, getChatMessages, clearAllState };

export default connect(mapStateToProps, mapDispatchToProps)(Socketscapsule);
