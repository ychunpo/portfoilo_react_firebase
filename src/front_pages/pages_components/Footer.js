import React from "react";
import styled from "styled-components";

const FooterBox = styled.div`
  margin: 5px;
  padding: 5px;
  text-align: center;
  display: flex;
  justify-content: space-around;



`

const Footer = () => {
  return (
    <FooterBox>
      <div className="footer-left">
        <p>&copy; {new Date().getFullYear()} All Rights Reserved. </p>
      </div>
      <div className="footer-right">
        <p>Design and Created by C. P. Yeung</p>
      </div>
    </FooterBox>
  )
}

export default Footer;