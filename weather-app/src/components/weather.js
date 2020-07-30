import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import LeftWeather from "./lweather";
import RightWeather from "./rweather";

const AnimFade = keyframes`
  to {
    visibility: visible;
    opacity: 1;
    top: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  top: 50px;
  padding: 40px 0;
  margin-top: 100px;
  opacity: 0;
  visibility: hidden;
  animation: ${AnimFade} 0.5s 1s forwards;
`;

class Weather extends React.Component {
  render() {
    const data = this.props.weather;
    return (
      <Container>
        <LeftWeather data={data} />
        <RightWeather data={data} />
      </Container>
    );
  }
}

export default Weather;
