import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.textarea`
  width: 100%;
  border: 1px solid #5995ef;
  background-color: #fff;
  height: ${(props) => `${props.len}px`};
`;

export const Button = styled.button`
  width: 100px;
  height: 35px;
  background-color: #5995ef;
  color: #fff;
  border-radius: 3px;
  border-color: unset;
  border-style: unset;
  margin: 40px 10px 0 10px;
`;

export const DeleteButton = styled.button`
  margin: 40px 10px 0 10px;
  width: 100px;
  height: 35px;
  background-color: #d73a49;
  color: #fff;
  border-radius: 3px;
  border-color: unset;
  border-style: unset;
`;

export const Text = styled.p`
  color: ${(props) => props.color || '#4d4d4d'};
`;

export const DeletePanel = styled.div`
  padding: 30px;
  text-align: center;

  Button {
    margin-top: unset;
  }
`;

export const HighlightButtons = styled.div`
  text-align: right;
  margin-top: 10px;

  svg {
    margin: 0 10px 0 0;
    cursor: pointer;
  }
`;
