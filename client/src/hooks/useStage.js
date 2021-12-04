import { useState, useEffect } from "react";
import { createStage } from "../Components/gameHelpers";

export const useStage = (player,nextPiece, resetPlayer, gameOver) => {
  const [stage, setStage] = useState(createStage());
  const [nextStage, setNextStage] = useState(createStage(4, 4));
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);
    const sweepRows = (newStage) =>
      newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);

    const updateStage = (prevStage) => {
      // First flush the stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      console.log(player.tetromino)
      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            // if(newStage[y + player.pos.y][x + player.pos.x].toString() === [0, "clear"].toString())
              newStage[y + player.pos.y][x + player.pos.x] = [
                value,
                `${player.collided ? "merged" : "clear"}`,
              ];
          }
        });
      });

      // for (let y = 0; y < player.tetromino.length; y += 1){
      //   for (let x = player.tetromino[y].length-1; x >= 0; x -= 1) {
      //     if (player.tetromino[y][x] !== 0) {
      //       if(newStage[y + player.pos.y][x + player.pos.x].toString() === [0, "clear"].toString()){
      //         newStage[y + player.pos.y][x + player.pos.x] = [
      //           player.tetromino[y][x],
      //           `${player.collided ? "merged" : "clear"}`,
      //         ];
      //       }else
      //       break
      //     }
      //   }
      // }

      // Then draw the next tetromino
      nextPiece.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            nextStage[y][x] = [
              value,
              `${nextPiece.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });
      // Then check if we got some score if collided
      if (player.collided && !gameOver) {
        resetPlayer(newStage);
        setNextStage(createStage(4,4))
        return sweepRows(newStage);
      }
      return newStage;
    };
    // setNextStage(createStage(4, 4));
    // Here are the updates
    setStage((prev) => updateStage(prev));
  }, [
    player.collided,
    player.pos.x,
    player.pos.y,
    player.tetromino,
    resetPlayer,
    nextPiece,
    nextStage,
    gameOver
  ]);

  return [stage, nextStage, setStage, setNextStage, rowsCleared];
};
