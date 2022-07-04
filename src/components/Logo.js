import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const LogoStyle = styled.div`
margin: 5px;
padding: 5px;
display: flex;
.logo-link {
  margin: 5px;
  padding: 0;  
  display: flex;
  align-items: center;
  cursor: pointer;
}
.logo-size {
  width: 101px;
  height: 32px;
}`

const Logo = () => {
  return (
    <LogoStyle>
      <Link className="logo-link" to='/'>
        <img className="logo-size" src={logo} alt='Logo' />
      </Link>
    </LogoStyle>
  )
}

export default Logo;