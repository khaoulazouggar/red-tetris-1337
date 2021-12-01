import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from './tetriminos';

// React.memo makes sure we only re-render the changed cells
const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color}>
    {console.log('rerender cell')}
  </StyledCell>
  // <div className="col" type={type} color={TETROMINOS[type].color}></div>
);

export default React.memo(Cell);
