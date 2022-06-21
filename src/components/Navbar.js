import React from 'react';
import Logo from './Logo';

const Navbar = () => {
  return (

    <div class="bar" >
      <Logo />
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">About</a></li>
          <li><a href="/">Portfolio</a></li>
          <li><a href="/">Skill</a></li>
          <li><a href="/">Contact</a></li>
        </ul>
      </nav>
    </div >

  );
};

export default Navbar;
