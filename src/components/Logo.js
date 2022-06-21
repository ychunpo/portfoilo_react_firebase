import React from 'react';
import logo from '../assets/logo.png';

const Logo = () => {
  return (
    <div>
      <a href='/' className='brand-logo'>
        <img src={logo} alt='Logo' />
      </a>
    </div>
  )
}

export default Logo;