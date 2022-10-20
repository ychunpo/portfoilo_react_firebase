import styled from 'styled-components';

export const APFContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 85%;
  font-family: "Poppins", sans-serif;  

  .APF-main {
    padding-left: 40px;
    
    background-color: rgb(245, 205, 245);

  }

  .APF-main-header {
    padding: 5px;
  }

  .APF-main-title {
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
  }

  .APF-main-form {
    position: absolute;
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(245, 245, 245);
  }

  .APF-main-form-item {
    margin-bottom: 10px;
    width: 90%;
  }

  .APF-main-form-label {
    font-size: 1.1rem;   
    display: inline-block;    
    margin-bottom: 6px;    
  }

  .APF-main-form-input {
    font-size: 1.1rem;
    display: block;
    outline: none;
    border-radius: 2px;
    border: none;
    width: 100%;    
  }

  .APF-main-form-input::placeholder {
    color: #595959;
    font-size: 1.2rem;
  }

  .APF-main-form-item input {    
    height: 20px;
  }

  .APF-main-form-item textarea {    
    height: 60px;
  }

  .APF-main-btn-group {
    
    display: flex;
    justify-content: space-around;
  }

  button {
    padding: 5px;
    width: 90px;
    font-size: 1.3rem;
    cursor: pointer;
  }

  .APF-main-btn-cancel {}

  .APF-main-btn-save {} 
`