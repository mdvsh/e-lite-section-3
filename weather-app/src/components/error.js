import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { MdErrorOutline } from "react-icons/md";

const AnimFade = keyframes`
  to {
    opacity: 1;
    visibility: visible;
    top: 0;
  }
`;

const ErrorDiv = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  max-width: 500px;
  margin: 100px auto;
  padding-top: 20px;
  top: 20px;
  border-radius: 8px;
  opacity: 0;
  visibility: hidden;
  position: relative;
  animation: ${AnimFade} 1s 1.5s forwards;
`;

const Erroricon = styled.span`
  display: block;
  color: #ffffff;
  font-size: 2.5rem;
  margin-right: 20px;
  padding-left: 10px;
`;

const ErrorM = styled.span`
  color: #ffffff;
  font-size: 1.2rem;
`;

const NotFound = () => {
  return (
    <ErrorDiv>
      <Erroricon>
        <MdErrorOutline />
      </Erroricon>
      <ErrorM>Error! The entered city wasn't found...</ErrorM>
    </ErrorDiv>
  );
};

export default NotFound;
