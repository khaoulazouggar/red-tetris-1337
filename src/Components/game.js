import { useEffect, useState, useRef } from "react";
import Board from "./board";
import Chat from "./chat";
import "../scss/home.scss";
import "../scss/room.scss";
import { useStage } from "../hooks/useStage";
import { usePlayer } from "../hooks/usePlayer";
import { createStage } from "./gameHelpers";

function Game(props) {
  const [username, setusername] = useState(props.data.username);
  const [roomName, setroomName] = useState(props.data.roomName);
  const [start, setstart] = useState(true);
  const [submited, setsubmited] = useState(true);
  const gameRef = useRef(null);
  const [player,updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);
  const [gameOver, setGameOver] = useState(false);
  
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
      setStage(createStage());
    // setDropTime(1000);
    resetPlayer();
    } else console.log("no");
  }
  
  const movePlayer = dir => {
    // if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    // }
  };

  const drop = () => {
    // // Increase level when player has cleared 10 rows
    // if (rows > (level + 1) * 10) {
    //   setLevel(prev => prev + 1);
    //   // Also increase speed
    //   setDropTime(1000 / (level + 1) + 200);
    // }

    // if (!checkCollision(player, stage, { x: 0, y: 1 })) {
    //   updatePlayerPos({ x: 0, y: 1, collided: false });
    // } else {
    //   // Game over!
    //   if (player.pos.y < 1) {
    //     console.log('GAME OVER!!!');
    //     setGameOver(true);
    //     setDropTime(null);
    //   }
    //   updatePlayerPos({ x: 0, y: 0, collided: true });
    // }

    updatePlayerPos({ x: 0, y: 1, collided: false });
  };

  const dropPlayer = () => {
    // setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } 
      // else if (keyCode === 38) {
      //   playerRotate(stage, 1);
      // }
    }
  };

  return (
    <div
      className="room-field"
      onKeyPress={startgame}
      tabIndex="0"
      ref={gameRef}
      onKeyDown={e => move(e)}
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
        <Board data={{ start, setstart, stage }} />
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
