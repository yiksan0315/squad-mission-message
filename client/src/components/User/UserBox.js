import OpenColor from 'open-color';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { shadow } from '../../utils/StyleUtil';

const Wrapper = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: inherit;

  & + & {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }

  &:hover {
    background: ${OpenColor.gray[1]};
    ${shadow(0)}
  }

  &:active {
    background: ${OpenColor.gray[3]};
  }
`;

const UserBox = ({ id, nickname }) => {
  return <Wrapper to={`/chat/${id}`}>{nickname}</Wrapper>;
};

export default UserBox;
