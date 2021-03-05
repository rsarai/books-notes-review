import styled from 'styled-components';

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

