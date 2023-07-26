import styled from 'styled-components';
import OpenColor from 'open-color';
import { shadow } from '../../utils/StyleUtil';
import React from 'react';

const Wrapper = styled.input`
  margin: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;

  border-radius: 0.5rem;
  border: none;

  background: ${OpenColor.indigo[8]};
  color: white;

  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;

  cursor: pointer;
  user-select: none;
  transition: 0.2s all;

  &:hover {
    background: ${OpenColor.indigo[9]};
    ${shadow(0)}
  }

  &:active {
    background: ${OpenColor.indigo[2]};
  }
`;

const HeaderButton = ({ value, onClick }) => {
  return <Wrapper type="button" value={value} onClick={onClick}></Wrapper>;
};

export default React.memo(HeaderButton);
