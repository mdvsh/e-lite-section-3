import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

const AnimFade = keyframes`
  to {
    visibility: visible;
    opacity: 1;
    top: 0;
  }
`;

const Button = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: none;
  border-radius: 2px;
  padding: 15px 20px;
  cursor: pointer;
  visibility: hidden;
  position: relative;
  animation: ${AnimFade} 0.5s 1s forwards;
`;

function GoBackButton() {
  return <Button>Go Back.</Button>;
}

export default GoBackButton;
