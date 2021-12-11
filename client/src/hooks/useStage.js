import { useState, useEffect } from "react";
import { checkCollision, createStage, STAGE_HEIGHT } from "../Components/gameHelpers";

export const useStage = (player, nextPiece, resetPlayer, gameOver) => {
  const [stage, setStage] = useState(createStage());
  const [nextStage, setNextStage] = useState(createStage(4, 4));
  const [rowsCleared, setRowsCleared] = useState(0);

  let shadow = 0;
  while (shadow < STAGE_HEIGHT && !checkCollision(player, stage, { x: 0, y: shadow })) {
    shadow++;
  }
  
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
      const newStage = prevStage.map((row) => row.map((cell) => (cell[1] === "clear" ? [0, "clear"]: cell  )));

      // Then draw the shadow of tetromino
    //   console.log(shadow);
      if (shadow) {
        player.tetromino.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              newStage[y + player.pos.y + shadow - 1][x + player.pos.x] = [
                value + "S",
                `${player.collided ? "merged" : "clear"}`,
              ];
            }
          });
        });
      }

      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [value, `${player.collided ? "merged" : "clear"}`];
          }
        });
      });

      // Then draw the next tetromino
      nextPiece.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            nextStage[y][x] = [value, `${nextPiece.collided ? "merged" : "clear"}`];
          }
        });
      });

      // Then check if we got some score if collided
      if (player.collided && !gameOver) {
        resetPlayer(newStage);
        setNextStage(createStage(4, 4));
        return sweepRows(newStage);
      }
      return newStage;
    };

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
    gameOver,
    shadow,
  ]);

  return [stage, nextStage, setStage, setNextStage, rowsCleared];
};
