import React from "react";
import styled from "styled-components";
import PanelNavbar from "../../components/admin/PanelNavbar";

const Container = styled.div`

`

const ControlPanel = () => {
  return (
    <Container>
      <PanelNavbar />
      <div>
        Panel Page
      </div>
    </Container>
  )
}

export default ControlPanel;