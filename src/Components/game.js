import { useEffect } from "react";
import Board from "./board";
import Chat from "./chat";
import "../scss/home.scss";
import "../scss/room.scss";

function Game(props) {
  useEffect(() => {
    props.data.clicked === 1 ? props.data.setclicked(2) : props.data.setclicked(5);
    // eslint-disable-next-line
  }, []);
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <div className="room-field">
      <div className="right-field" data-aos="fade-up" data-aos-duration="2000">
        <div className="score next-field">
          <p className="next-p">Next</p>
          <div className="next"></div>
        </div>
        <div className="chat left-chat"></div>
      </div>
      <div className="left-field game" data-aos="fade-down" data-aos-duration="2000">
        <Board />
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
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default Game;
