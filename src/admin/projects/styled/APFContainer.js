import styled from 'styled-components';

export const APFContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 80%;
  font-family: "Poppins", sans-serif;  

  .APF-main {
        
    background-color: rgb(245, 205, 245);
  }

  .APF-main-form {      
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
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
`