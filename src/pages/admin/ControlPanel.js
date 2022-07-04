import React from "react";
import styled from "styled-components";
import PanelNavbar from "../../components/admin/PanelNavbar";

const Container = styled.div`
  margin: 0px;
  padding: 0px;
  text-align: center;
`

const ControlPanel = () => {
  return (
    <Container>
      <PanelNavbar />
      <div className="">
        Panel Page
      </div>
    </Container>
  )
}

export default ControlPanel;