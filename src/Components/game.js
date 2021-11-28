import { useEffect, useState, useRef } from "react";
import Board from "./board";
import Chat from "./chat";
import "../scss/home.scss";
import "../scss/room.scss";

function Game(props) {
  const [username, setusername] = useState(props.data.username);
  const [roomName, setroomName] = useState(props.data.roomName);
  const [start, setstart] = useState(true);
  const [submited, setsubmited] = useState(true);
  const gameRef = useRef(null);

  useEffect(() => {
    gameRef.current.focus();
    props.data.clicked === 1
      ? props.data.setclicked(2)
      : props.data.setclicked(5);
    // eslint-disable-next-line
  }, []);
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  function startgame(e) {
    if (e.key === "Enter" && submited) {
      setstart(false);
    } else console.log("no");
  }
  return (
    <div
      className="room-field"
      onKeyPress={startgame}
      tabIndex="0"
      ref={gameRef}
    >
      <div className="right-field" data-aos="fade-up" data-aos-duration="2000">
        <div className="score next-field">
          <p className="next-p">Next</p>
          <div className="next"></div>
        </div>
        <div className="chat left-chat"></div>
      </div>
      <div
        className="left-field game"
        data-aos="fade-down"
        data-aos-duration="2000" 
      >
        <Board data={{ start, setstart }} />
      </div>

      <div className="right-field" data-aos="fade-up" data-aos-duration="2000">
        <div className="score">
          <div className="score-level">
            <div className="score-level-div">
              <p className="score-p">Score</p>
              <div className="score-num">0</div>
            </div>
            <div className="score-level-div">
              <p className="score-p">level</p>
              <div className="score-num">0</div>
            </div>
          </div>
          <div className="mode-div">
            <p className="score-p">mode</p>
            <div className="">
              <select className="mode-select" onChange={handleChange}>
                <option value="solo" defaultValue>
                  solo
                </option>
                <option value="batlle">batlle</option>
              </select>
            </div>
          </div>
        </div>
        <div className="chat">
          <Chat
            data={{
              username,
              setusername,
              roomName,
              setroomName,
              submited,
              setsubmited,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Game;
