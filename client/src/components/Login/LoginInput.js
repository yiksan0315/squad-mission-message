import styled from 'styled-components';
import oc from 'open-color';
import React from 'react';

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const Label = styled.div`
  font-size: 1rem;
  color: ${oc.gray[6]};
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  border: 1px solid ${oc.gray[3]};
  outline: none;
  border-radius: 0px;
  line-height: 2.5rem;
  font-size: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  width: 90%;
`;

const LoginInput = ({ label, value, onChange, ...rest }) => (
  <Wrapper>
    <Label>{label}</Label>
    <Input
      label={label}
      name={label}
      placeholder={label}
      value={value}
      onChange={onChange}
      {...rest}
    />
  </Wrapper>
);

export default React.memo(LoginInput);
