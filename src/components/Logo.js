import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const LogoStyle = styled.div`
margin: 5px;
padding: 5px;
display:flex;
text-align: left;
a {
  margin: 5px;
  padding: 0;
}
`

const Logo = () => {
  return (
    <LogoStyle>
      <a href='/'>
        <img src={logo} alt='Logo' />
      </a>
    </LogoStyle>
  )
}

export default Logo;