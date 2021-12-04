import React from 'react';
import { StyledPlayersStage } from './styles/StyledPlayersStage';

import Cell from './Cell';

const Stage = ({ stage }) => (
  <StyledPlayersStage width={stage[0].length} height={stage.length}>
    {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledPlayersStage>
//<div className="row" width={stage[0].length} height={stage.length}>
//{stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
//</div>
  );

export default Stage;
