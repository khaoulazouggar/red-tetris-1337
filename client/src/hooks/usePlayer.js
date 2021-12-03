import { useState, useCallback } from "react";

import { TETROMINOS, randomTetromino } from "../Components/tetriminos";
import { STAGE_WIDTH, checkCollision } from "../Components/gameHelpers";

export const usePlayer = (setGameOver, setstart, setDropTime) => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

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

  // const resetPlayer = useCallback(() => {
  //   setPlayer({
  //     pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
  //     tetromino: randomTetromino().shape,
  //     collided: false,
  //   });

  //   setNextPiece({
  //     pos: { x: 0, y: 0 },
  //     tetromino: randomTetromino().shape,
  //     collided: false,
  //   });
  // }, []);

  const resetPlayer = useCallback((stage) => {
    let tetrimin = randomTetromino()
    // let color = tetrimin.shape.length === 1 ? "I" : 
    // tetrimin.shape.length === 2 ? "J" : 
    // tetrimin.shape.length === 3 ? "L" : 
    // tetrimin.shape.length === 4 ? "O" :
    // tetrimin.shape.length === 5 ? "S" :
    // tetrimin.shape.length === 6 ? "T" :
    // tetrimin.shape.length === 7 ? "Z" : 0
    // console.log( TETROMINOS[tetrimin.shape.length])
    let tetris = {
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: tetrimin.shape,
      collided: false,
    };
    if(stage){
      if (!checkCollision(tetris, stage, { x: 0, y: 0 })) {
        setPlayer({
          pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
          tetromino: tetris.tetromino,
          collided: false,
        });
      } else {
        // for (let y = 0; y < tetris.tetromino.length; y += 1) {
        //   for (let x = 0; x < tetris.tetromino[y].length; x += 1) {
        //     // 1. Check that we're on an actual Tetromino cell
        //     if (tetris.tetromino[y][x] !== 0) {
        //       if (
        //         // 4. Check that the cell wer'e moving to isn't set to clear
        //         stage[y + tetris.pos.y][x + tetris.pos.x][1] !==
        //           'clear'
        //       ) {
        //         console.log(x + "here" + y)

        //         // tetris.tetromino.forEach((row, y) => {
        //         //   row.forEach((value, x) => {
        //         //     if (value !== 0) {
        //               stage[y + tetris.pos.y][x + tetris.pos.x] = [
        //                 "Z"
        //                 `${tetris.collided ? "merged" : "clear"}`,
        //               ];
        //         //     }
        //         //   });
        //         // });
        //       }
        //     }
        //   }
        // }
        console.log("GAME OVER!!!");
        setGameOver(true);
        setstart(true);
        setDropTime(null);
        }
    }else{
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
  }, []);

  return [player, nextPiece, updatePlayerPos, resetPlayer, playerRotate];
};
