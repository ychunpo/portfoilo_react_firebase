import React from "react";
import styled from "styled-components";

const IntroBox = styled.div`

.intro-text {
  text-align: left;
}

`


const IntroContent = () => {
  return (
    <IntroBox>
      <div className="intro-text">
        <h3>Hello, My name is </h3>
        <h1>C. P. Yeung</h1>

      </div>
    </IntroBox>
  )
}

export default IntroContent;