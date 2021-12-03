import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { socket } from "../socket/socket"
// import { ClickOutHandler } from "react-onclickout";
const ClickOutHandler = require("react-onclickout");

function Chat(props) {
  const [message, setmessage] = useState();
  const [chat, setChat] = useState([]);
  const [roomPlayer, setRoomPlayer] = useState([]);
  const [playersJoined, setPlayersJoined] = useState([]);

  /*  Socket Area */
  useEffect(() => {
    /* Listen for new messages */
    socket.on("chat", (data) => {
      setChat((chat) => [...chat, data]);
    });
  }, []);
  /* Listen for players List */
  socket.on("roomPlayers", (data) => {
    setRoomPlayer(data);
  });
  /* Listener tell us when a player join the room */
  socket.on("playersJoined", (data) => {
    setPlayersJoined([...playersJoined, data]);
  });
  /* End Socket Area */
  const handleChange = (e) => {
    setmessage(e.target.value)
  };

  const insetMsg = (e) => {
    e.preventDefault();
    props.data.setsubmited(false);
    document.getElementById("msg").value = "";
    if (message) {
      if (message?.trim() !== "") {
        socket.emit("send_message", { name: props?.data?.username, message: message, room: props.data.roomName })
        setmessage("");
      }
    }
  }
  return (
    <div className="chat-field">
      <div className="players">
        <div className="title-PM">
          <p>Players</p>
        </div>
        <div className="name-players">
          {roomPlayer.length > 0 && roomPlayer?.map((player, i) => {
            return (
              <div key={i}>
                {player}
              </div>
            );
          })}
        </div>
      </div>
      <div className="messages">
        <div className="title-PM">
          <p>Messages</p>
        </div>
        <div className="messages-field">
          <div>
            <div className="player-room">
              {playersJoined.length > 0 && playersJoined?.map((msg, i) => {
                return (
                  <div key={i}>{msg}</div>
                );
              })}
            </div>
            {chat?.map((chatmsg, index) => (
              <div key={index}>
                <div>
                  <div className="chatmsg">
                    <span className="chatsender">
                      {chatmsg?.name}
                    </span>
                    <span>{chatmsg?.message}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ClickOutHandler onClickOut={() => props.data.setsubmited(true)}>
          <form className="input-form" onSubmit={insetMsg}>
            <input
              type="text"
              onClick={() => props.data.setsubmited(false)}

              placeholder="Write  a  message ..."
              className="input-message"
              id="msg"
              onChange={handleChange}
            />
            <div onClick={(e) => insetMsg(e)} className="send-icon">
              <FontAwesomeIcon icon={faPaperPlane} className="icon" />
            </div>
          </form>
        </ClickOutHandler>
      </div>
    </div>
  );
}

export default Chat;
