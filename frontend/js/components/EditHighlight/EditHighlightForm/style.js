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

export const Text = styled.p`
  color: ${(props) => props.color || '#4d4d4d'};
`;

export const FieldsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const SidePanel = styled.div`
  display: flex;
  padding-left: 15px;
  flex-direction: column;
  width: 40%;

  .notes {
    background-color: white;
    border: 1px solid #5995ef;
    height: 100%;
    margin-bottom: 20px;
    padding: 20px;
    color: #5e8ccd;
  }

  .text-input {
    padding: 20px;
  }

  label {
    color: #99afce;
    padding-left: 20px;
  }
`;
