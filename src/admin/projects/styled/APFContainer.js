import styled from 'styled-components';

export const APFContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 75%;
  font-family: "Poppins", sans-serif;  

  .APF-main {
    padding-left: 40px;    
    background-color: rgb(245, 205, 245);
  }

  .APF-main-header {    
    padding-top: 5px;
  }

  .APF-main-title {   
    font-weight: bold;
    
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
    font-size: 1rem;
  }

  .APF-main-form-item-input {    
    display: block;
    outline: 5px;
    border-radius: 2px;
    border-color: gray;  
  }

  .APF-main-form-item-input::placeholder {    
    font-size: 1.5rem;
  }

  .APF-main-form-item input {    
    height: 20px;
  }

  .APF-main-form-item-textarea {
    outline: 5px;    
    height: 60px;
  }

  .APF-main-cover-image {

  }

  .APF-main-item-image {
    
  }

  .APF-main-btn-group {    
    display: flex;
    justify-content: space-around;
  }

  .APF-main-btn-cancel {}

  .APF-main-btn-save {} 
`