import React from "react";
import styled from "styled-components";

const FooterBox = styled.div`
margin: 5px
padding: 5px;
text-align: center;
`

const Footer = () => {
  return (
    <FooterBox>
      <p>&copy; {new Date().getFullYear()} All Rights Reserved. Created by C. P. Yeung.</p>
    </FooterBox>
  )
}

export default Footer;