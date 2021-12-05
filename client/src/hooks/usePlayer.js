import { useState, useCallback, useEffect } from "react";

import { TETROMINOS, randomTetromino } from "../Components/tetriminos";
import { STAGE_WIDTH, checkCollision } from "../Components/gameHelpers";
import { socket } from "../socket/socket";

export const usePlayer = (setGameOver, setstart, setDropTime, tetriminos) => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });
  // const [tetriminos, setTetriminos] = useState([]);
  const [nextTetromino, setNextTetromino] = useState("");



  // useEffect(() => {
  //   socket.on("startGame", (tetriminos) => {
  //     console.log("startGame", tetriminos);
  //     setTetriminos(tetriminos);
  //     setNextTetromino(tetriminos[1])
  //     console.log("-----------------", TETROMINOS[tetriminos[0]].shape);
  //   });
  // }, []);

  useEffect(() => {
    console.log("----------------------------------", tetriminos);
  }, [tetriminos]);

  const [nextPiece, setNextPiece] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  function rotate(matrix, dir) {
    // Make the rows to become cols (transpose)
    const mtrx = matrix.map((_, index) =>
      matrix.map((column) => column[index])
    );
    // Reverse each row to get a rotaded matrix
    if (dir > 0) return mtrx.map((row) => row.reverse());
    return mtrx.reverse();
  }

  function playerRotate(stage, dir) {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  }

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback((stage) => {
    if (tetriminos[0]) {
      let tetris = {
        pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetromino: TETROMINOS[tetriminos[0]].shape,
        collided: false,
      };
      if (stage) {
        if (!checkCollision(tetris, stage, { x: 0, y: 0 })) {
          setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: tetris.tetromino,
            collided: false,
          });
        } else {
          console.log("GAME OVER!!!");
          setGameOver(true);
          setstart(true);
          setDropTime(null);
        }
      } else {
        setPlayer({
          pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
          tetromino: tetris.tetromino,
          collided: false,
        });
      }

      setNextPiece({
        pos: { x: 0, y: 0 },
        tetromino: randomTetromino().shape,
        collided: false,
      });
    }
  }, [setGameOver, setstart, setDropTime]);

  return [player, nextPiece, updatePlayerPos, resetPlayer, playerRotate];
};
