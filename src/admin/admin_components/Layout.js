import React from 'react'
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const ALOComponent = styled.div` 
  display: flex;
  justify-content: center; 

  .ALO-layout {
    display: flex;
    width: 70%;
  }

  .ALO-sidebar {
    margin: 0;
    padding: 0;    
  }
`

const Layout = () => {
  return (
    <ALOComponent>
      <div className='ALO-layout'>
        <div className='ALO-sidebar'>
          <Sidebar />
        </div>
        <Outlet />
      </div>
    </ALOComponent>
  )
}

export default Layout;