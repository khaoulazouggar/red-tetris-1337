import styled from 'styled-components';

export const StyledNextCell = styled.div`
  width: auto;
  background: rgba(${props => (props.type === 0) ? (0,0,0,0.8): (props.color)});
  border: ${props => (props.type === 0 ? 'unset' : '4px solid')};
  border-right-color: rgba(${props => props.color});
  border-top-color: rgba(${props => props.color});  
`;
