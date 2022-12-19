import React from "react";
import styled from "styled-components";
import HelloBox from "./HelloBox";
import NameBox from "./NameBox";

const IntroBox = styled.div`
  .intro-text {}
`

const IntroContent = () => {
  return (
    <IntroBox>
      <div className="intro-text">
        <HelloBox
          text="Hello there, I am"
        />
        <NameBox text="C. P. Yeung" />
      </div>
    </IntroBox>
  )
}

export default IntroContent;