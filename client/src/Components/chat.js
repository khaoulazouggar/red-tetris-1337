import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// import { ClickOutHandler } from "react-onclickout";
const ClickOutHandler = require("react-onclickout");

function Chat(props) {
  const [message, setmessage] = useState();
  const [chat, setChat] = useState([]);
  const handleChange = (e) => setmessage(e.target.value);

  function insetMsg(e) {
    e.preventDefault();
    props.data.setsubmited(false);
    console.log(message);
    document.getElementById("msg").value = "";
    if (message) {
      if (message?.trim() !== "") {
        let newValue = { content: message };
        let push = chat?.concat(newValue);
        console.log(push);
        setChat(push);
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
          <div>{props.data?.username ? props.data?.username : "khaoula"}</div>
        </div>
      </div>
      <div className="messages">
        <div className="title-PM">
          <p>Messages</p>
        </div>
        <div className="messages-field">
          <div>
            <div className="player-room">
              {props.data?.username ? props.data?.username : "khaoula"} joined
              {props.data?.roomName}
            </div>
            {chat?.map((chatmsg, index) => (
              <div key={index}>
                <div>
                  <div className="chatmsg">
                    <span className="chatsender">
                      {props.data?.username ? props.data?.username : "khaoula"}
                      :
                    </span>
                    <span>{chatmsg?.content}</span>
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
