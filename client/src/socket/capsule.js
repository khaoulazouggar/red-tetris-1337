import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  StartGame,
  newTetriminos,
  getRoomPlayerslist,
  getChatMessages,
  clearAllState,
  setStages
} from "../redux/actions/sockets/socketsActions";
import { socket } from "./socket";

const Socketscapsule = (props) => {
  const { tetriminos, Stages } = props;

  useEffect(() => {
    // listen for starting the Game
    socket.on("startGame", (tetris) => {
      props.StartGame(tetris);
    });
    // get the new tetriminos from the server and update the state with it
    socket.on("newTetriminos", (tetris) => {
      props.newTetriminos(tetris, tetriminos);
    });
    // get players Stages State
    socket.off("getstages");
    socket.on("getstages", (stage) => {
      console.log('test')
      props.setStages(Stages, stage);
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
  Stages: state.sockets.Stages
});

const mapDispatchToProps = { StartGame, newTetriminos, getRoomPlayerslist, getChatMessages, clearAllState, setStages };

export default connect(mapStateToProps, mapDispatchToProps)(Socketscapsule);
