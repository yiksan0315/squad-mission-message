import styled from 'styled-components';

export const StyledWindow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  color: rgba(0, 0, 0, 0.5);
  background-color: transparent;
  align-items: center;
  justify-content: center;
`;

export const StyledBackground = styled.div`
  width: 50%;
  height: 75%;

  @media (max-width: 400px) {
    width: 200px;
  }

  @media (max-height: 600px) {
    height: 450px;
  }

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 1em;
`;
