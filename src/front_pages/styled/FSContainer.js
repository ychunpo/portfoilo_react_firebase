import styled from 'styled-components';

export const FSContainer = styled.div`
  background-color: orange;
  height: 95vh;
  ul {
    list-style: none;
  }
  
  .FS-title {
    margin: auto;
    padding-top: 30px;
    font-size: 2rem;
    text-align: center;
  }

  .FS-include {
    padding-bottom: 20px;
    text-align: center;
  }

  .FS-main {
    max-width: 960px;
    padding-top: 20px;
    margin: 0 auto;
    line-height: 1.5;
  }

  .FS-list {
    
  }

  .FS-list text{
    font-size: 20px;
    font-weight: bold;
    padding: .3rem 0;
  }

  .FS-list li {
    width: 31.3333%;
    margin: 0 1%;
    float: left;
  }

  @media (max-width: 768px) {
  .FS-list li {
    width: 48%;
  }}

  @media (max-width: 569px) {
    .FS-list li {
      width: 98%;
    }
  }
`