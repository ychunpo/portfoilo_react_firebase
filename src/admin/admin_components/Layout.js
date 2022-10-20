import React from 'react'
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const LOComponent = styled.div` 
  display: flex;
  justify-content: center; 

  .admin-layout {
    display: flex;    
    width: 80%;
  }

  .admin-sidebar {
    margin: 0;
    padding: 0;
    display: flex;
  }
`

const Layout = () => {
  return (
    <LOComponent>
      <div className='admin-layout'>
        <div className='admin-sidebar'>
          <Sidebar />
        </div>
        <Outlet />
      </div>
    </LOComponent>
  )
}

export default Layout;