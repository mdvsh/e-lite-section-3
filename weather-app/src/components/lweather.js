import React from "react";
import styled from "styled-components";

const Div = styled.div`
  flex-basis: 100%;
`;

const Info = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  flex-basis: 100%;
  margin: 20px 0;
  grid-gap: 30px;
  @media (min-width: 525px) {
    flex-basis: 50%;
    padding-right: 30px;
    padding-left: 30px;
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding-right: 40px;
    padding-left: 40px;
  }
`;

const Heading = styled.h2`
  display: block;
  color: white;
  font-weight: 600;
  font-size: 3.5rem;
  text-align: left;
  padding: 8px 0;
`;

const Num = styled.h3`
  display: block;
  color: #ffffff;
  font-size: 7rem;
  font-weight: 400;
`;

const Subtitle = styled.h4`
  display: block;
  color: white;
  font-weight: 400;
  font-size: 1.8rem;
  text-align: left;
  padding: 4px 0;
`;

class LeftWeather extends React.Component {
  render() {
    const data = this.props.data;

    return (
      <React.Fragment>
        <Div>
          <Heading>
            {data.city}, {data.country}
          </Heading>
          <Subtitle weight="400">
            {data.date} | {data.timezone}
          </Subtitle>
        </Div>
        <Info>
          <div>
            <Num>{Math.floor(data.weather)}&#176;</Num>
            <Subtitle weight="400">{data.desc}</Subtitle>
          </div>
        </Info>
      </React.Fragment>
    );
  }
}

export default LeftWeather;
