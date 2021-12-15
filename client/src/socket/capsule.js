import React, { useEffect } from "react";
import { connect } from "react-redux";
import Stage from "../Components/Stage";
import {
  StartGame,
  newTetriminos,
  getRoomPlayerslist,
  getChatMessages,
  clearAllState,
  setStages,
  updateStages,
  userExists,
  deleteUserfromStages
} from "../redux/actions/sockets/socketsActions";
import { socket } from "./socket";

const Socketscapsule = (props) => {
  const { tetriminos, Stages, roomname } = props;

  useEffect(() => {
    //initial Socket connection
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("clearStages", data => {
      props.deleteUserfromStages(data.username, Stages)
    })

    socket.on("useralready_exist", res => {
      props.userExists(res.res)
    })

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
      props.setStages(Stages, stage, roomname);
    });
    socket.on("updateStages", (stages) => {
      props.updateStages(stages)
    })
    // Listen for the room Players list
    socket.on("roomPlayers", (playersList) => {
      props.getRoomPlayerslist(playersList);
    });
    // Chat Listener
    socket.on("chat", (message) => {
      props.getChatMessages(message);
    });

    socket.on("room_full", () => {
      alert("rooom full")
    })
    
    // Disconnect Listener
    socket.on("disconnect", () => {
      console.log("disconnected");
      props.clearAllState();
    });
    // Clean up the event listeners
    return () => {

      socket.off("useralready_exist")
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
  Stages: state.sockets.Stages,
  roomname: state.sockets.roomname,
});

const mapDispatchToProps = { StartGame, newTetriminos, getRoomPlayerslist, getChatMessages, clearAllState, setStages, updateStages, userExists, deleteUserfromStages };

export default connect(mapStateToProps, mapDispatchToProps)(Socketscapsule);
