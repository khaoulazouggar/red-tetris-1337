import { useEffect, useState, useRef } from "react";
import Board from "./board";
import Chat from "./chat";
import "../scss/home.scss";
import "../scss/room.scss";
import { useStage } from "../hooks/useStage";
import { usePlayer } from "../hooks/usePlayer";
import { createStage, checkCollision } from "./gameHelpers";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";
import NextPiece from "./NextPiece";
import PlayersStage from "./PlayersStage";
import { socket } from "../socket/socket";
import { toast } from "react-toastify";
import { connect } from "react-redux";

function Game(props) {
  const { tetriminos } = props;
  const [username, setusername] = useState(props.data.username);
  const [roomName, setroomName] = useState(props.data.roomName);
  const start = props.data.start;
  const setstart = props.data.setstart;
  const [gameOver, setGameOver] = useState(false);
  const [dropTime, setDropTime] = useState(null);
  const [submited, setsubmited] = useState(true);
  const gameRef = useRef(null);
  // const [tetriminos, setTetriminos] = useState([]);
  const [getTetrimino, setgetTetrimino] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [firstDrop, setfirstDrop] = useState(1);

  // Custom Hooks
  const [player, nextPiece, updatePlayerPos, resetPlayer, playerRotate, concatTetriminos, setConcatTetriminos] =
    usePlayer(setGameOver, setstart, setDropTime, tetriminos, setgetTetrimino);
  const [stage, nextStage, setStage, setNextStage, rowsCleared] = useStage(player, nextPiece, resetPlayer, gameOver);

  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  // Start Game effect
  useEffect(() => {
    console.log("gameOver", gameOver);
    console.log("gameStart", gameStart);
    if (gameStart) {
      if (gameOver) {
        console.log("bdina");
        setStage(createStage());
        setNextStage(createStage(4, 4));
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setLevel(0);
        setRows(0);
      }
      if (firstDrop === 1) {
        resetPlayer();
        setfirstDrop(2);
        setScore(0);
        setLevel(0);
        setRows(0);
      }
      setstart(false);
      setGameOver(false);
      setGameStart(false);
      setDropTime(1000 / (level + 1) + 200);
      console.log("dropTime-------start", dropTime);
    }
  }, [gameStart]);

  useEffect(() => {
    console.log('mara 3afak');
    socket.emit("Stage", { stage, roomName: props.data.roomName, username });
  }, [stage]);
  //Get Tetriminos effect
  useEffect(() => {
    if (tetriminos.length > 0) {
      setGameStart(true);
      setgetTetrimino(true);
    }
    return () => { };
  }, [tetriminos]);

  // Get Tetriminos for the second time
  useEffect(() => {
    if (concatTetriminos) {
      socket.emit("newTetriminos", { room: props.data.roomName });
      setConcatTetriminos(false);
    }
    console.log("tetriminos", tetriminos);
  }, [concatTetriminos]);

  // Set focus on the game
  useEffect(() => {
    gameRef.current.focus();
    props.data.clicked === 1 ? props.data.setclicked(2) : props.data.setclicked(5);
    // eslint-disable-next-line
  }, []);

  // Solo Or Multiplayer
  function handleChange(event) {
    console.log(event.target.value);
    props.data.setmode(event.target.value);
  }

  //Get Tetriminos for the first time
  function startgame(e) {
    console.log("startgame", getTetrimino);
    if (e.key === "Enter" && submited) {
      if (!getTetrimino) {
        socket.emit("startgame", { room: props.data.roomName });
      }
    }
  }

  // Start Game (Drop the tetrimino down)
  useInterval(() => {
    drop();
  }, dropTime);

  // Move the tetrimino on (x) axis
  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  // Move the tetrimino down
  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 3) {
      setLevel((prev) => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
      console.log("dropTime-------drop", dropTime);

    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log("GAME OVER!!!");
        setGameOver(true);
        setstart(true);
        setDropTime(null);
        setgetTetrimino(false);
      }
      // the player has landed, so we can stop moving the tetrimino down and drop the next one
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  // Hard Drop the tetrimino
  const hardDrop = () => {
    let tmp = 0;
    while (!checkCollision(player, stage, { x: 0, y: tmp })) tmp += 1;
    // console.log(tmp);
    updatePlayerPos({ x: 0, y: tmp - 1, collided: false });
  };

  // Move the tetrimino
  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        drop();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      } else if (keyCode === 32) {
        hardDrop();
      }
    }
  };

  return (
    <div className="room-field" onKeyPress={startgame} tabIndex="0" ref={gameRef} onKeyDown={(e) => move(e)}>
      <div className="right-field" data-aos="fade-up" data-aos-duration="2000">
        <div className="score next-field">
          <p className="next-p">Next</p>
          <div className="next">{!start ? <NextPiece stage={nextStage} /> : ""}</div>
        </div>
        <div className="chat left-chat">
          <div className="players-field">
            <div style={{ position: "relative", margin: "10px" }}>
              <span>khaoula</span>
              <PlayersStage stage={stage} />
              <div className="players-overlay"></div>
            </div>
            <div style={{ position: "relative", margin: "10px" }}>
              <span>yassir</span>
              <PlayersStage stage={stage} />
              <div className="players-overlay"></div>
            </div>
            <div style={{ position: "relative", margin: "10px" }}>
              <span>yassir</span>
              <PlayersStage stage={stage} />
              <div className="players-overlay"></div>
            </div>
            <div style={{ position: "relative", margin: "10px" }}>
              <span>khaoula</span>
              <PlayersStage stage={stage} />
              <div className="players-overlay"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="left-field game" data-aos="fade-down" data-aos-duration="2000">
        <Board data={{ start, setstart, stage, gameOver }} />
      </div>

      <div className="right-field" data-aos="fade-up" data-aos-duration="2000">
        <div className="score">
          <div className="score-level">
            <div className="score-level-div">
              <p className="score-p">Score</p>
              <div className="score-num">{score}</div>
            </div>
            <div className="score-level-div">
              <p className="score-p">level</p>
              <div className="score-num">{level}</div>
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

const mapStateToProps = (state) => ({
  tetriminos: state.sockets.tetriminos,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
