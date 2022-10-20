import styled from "styled-components";

export const Dropzone = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 80px;
  color: #707070;
  border: 1px dashed #bdbdbd;
  font-size: 14px;
  cursor: pointer;

  input {
    display: none;
  }
`;

export const Input = styled.input`
  width: 80%;
  height: 40px;
  border: 1px solid #bdbdbd;
  padding: 0 20px;
  margin: 15px 0;
`;

export const ErrorMessage = styled.span`
  display: block;
  color: red;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 80%;
  height: 40px;
  background: #19a0d8;
  color: #fff;
  font-weight: bold;
  border: 0;
`;

export const SelectedFileContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
`;

export const SelectedFile = styled.span`
  font-size: 1rem;
`;

export const ClearFile = styled.button`
  border: 0;
  background: transparent;
  color: red;
  width: 1.5rem;
  cursor: pointer;
`;
