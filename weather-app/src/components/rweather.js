import React from "react";
import styled from "styled-components";

const DivRight = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-start;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px 0;
  margin: 10px 0;
  border-radius: 10px;
  @media (min-width: 425px) {
    flex-basis: 50%;
    padding: 20px;
  }
`;

const Rinfo = styled.div`
  flex-basis: calc(100% / 4);
  padding: 10px;
  @media (min-width: 1024px) {
    padding: 20px 10px;
  }
`;

const Stat = styled.h4`
  color: white;
  display: block;
  font-weight: 600;
  font-size: 1.8rem;
  text-align: center;
  padding: 4px 0;
`;

const Detail = styled.span`
  display: block;
  color: white;
  font-size: 1.25rem;
  text-align: center;
`;

class RightWeather extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <DivRight>
        <Rinfo>
          <Stat>{Math.ceil(data.high)}&#176;</Stat>
          <Detail>High</Detail>
        </Rinfo>

        <Rinfo>
          <Stat>{Math.ceil(data.fl)}&#176;</Stat>
          <Detail>Feels Like</Detail>
        </Rinfo>

        <Rinfo>
          <Stat>{data.humidity}%</Stat>
          <Detail>Humidity</Detail>
        </Rinfo>

        <Rinfo>
          <Stat>{data.lat}&#176;</Stat>
          <Detail>Lattitude</Detail>
        </Rinfo>

        <Rinfo>
          <Stat>{Math.ceil(data.low)}&#176;</Stat>
          <Detail>Low</Detail>
        </Rinfo>

        <Rinfo>
          <Stat>{data.ws}</Stat>
          <Detail>Wind Speed</Detail>
        </Rinfo>

        <Rinfo>
          <Stat>{data.clouds}%</Stat>
          <Detail>Clouds</Detail>
        </Rinfo>

        <Rinfo>
          <Stat align="center" weight="400">
            {data.lon}&#176;
          </Stat>
          <Detail>Longitude</Detail>
        </Rinfo>
      </DivRight>
    );
  }
}

export default RightWeather;
