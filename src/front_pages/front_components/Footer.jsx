import React from "react";
import styled from "styled-components";

const FooterBox = styled.div`  
  padding: 25px 0;  
  color: white;
  background-color: rgba(29,32,49,0.7);
  
  @media (min-width: 801px) {
    display: grid;
    grid-template-columns: 1fr 1fr; 
    place-items: center;
    
    foot-left: {}
    foot-right: {}      
  }

  @media(max-width: 800px) {
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
  }
`

const Footer = () => {
  return (
    <FooterBox>
      <div className="footer-left">
        <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
      </div>
      <div className="footer-right">
        <p>Designed and Created by C. P. Yeung</p>
      </div>
    </FooterBox>
  )
}

export default Footer;