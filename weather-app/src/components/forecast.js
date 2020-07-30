import React from "react";
import styled from "styled-components";
import device from "../responsive/Device";
import {
  WiThunderstorm,
  WiSprinkle,
  WiRain,
  WiDaySnow,
  WiDayHaze,
  WiDaySunny,
  WiCloudy,
  WiSmoke,
  WiDayFog,
  WiAlien,
} from "react-icons/wi";
import { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const AnimFade = keyframes`
  to {
    visibility: visible;
    opacity: 1;
    top: 0;
  }
`;

const Text = styled.span`
  display: block;
  color: white;
  font-size: 1.25rem;
  text-align: center;
`;

const Heading = styled.h2`
  display: block;
  color: white;
  font-weight: 600;
  font-size: 3.5rem;
  text-align: left;
  padding: 8px 0;
`;

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  padding: 10px;
  margin: 12px 5px;
  &:first-child {
    margin-left: 20px;
  }
  &:last-child {
    margin-right: 20px;
  }
`;

const ForecastWrapper = styled.div`
  flex-basis: 100%;
  overflow-x: auto;
  scrollbar-color: lightgray #ffffff;
  opacity: 0;
  visibility: hidden;
  animation: ${AnimFade} 0.8s 1.3s forwards;
`;

const DailyForecasts = styled.div`
  position: relative;
  display: flex;
  margin-top: 20px;

`;

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function dayGetter(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000);
  const todate = `${DAYS[a.getDay()]}`;
  return todate;
}

class DailyForecast extends React.Component {
  render() {
    let wicon;
    if (this.props.main === "Clouds") {
      wicon = <WiCloudy />;
    } else if (this.props.main === "Clear") {
      wicon = <WiDaySunny />;
    } else if (this.props.main === "Mist" || this.props.main === "Haze") {
      wicon = <WiDayHaze />;
    } else if (this.props.main === "Smoke") {
      wicon = <WiSmoke />;
    } else if (this.props.main === "Fog") {
      wicon = <WiDayFog />;
    } else if (this.props.main === "Snow") {
      wicon = <WiDaySnow />;
    } else if (this.props.main === "Rain") {
      wicon = <WiRain />;
    } else if (this.props.main === "Drizzle") {
      wicon = <WiSprinkle />;
    } else if (this.props.main === "Thunderstorm") {
      wicon = <WiThunderstorm />;
    } else {
      wicon = <WiAlien />;
    }
    return (
      <Container onClick={this.props.onClick}>
        <Text>
          <b>{this.props.day}</b>
        </Text>
        <Text>{this.props.desc}</Text>
        <Heading style={{ fontWeight: "400", textAlign: "center" }}>
          {wicon}
        </Heading>
      </Container>
    );
  }
}

class Forecast extends React.Component {
  render() {
    const forecasts = this.props.forecast;
    const daily_forecast = forecasts.map((df) => (
      <Link to={`/${dayGetter(df.dt)}`} style={{ textDecoration: "none" }}>
        <DailyForecast
          key={df.dt}
          day={dayGetter(df.dt)}
          main={df.weather[0].main}
          desc={df.weather[0].description}
          onClick={() => this.props.onClick(df.dt)}
        />
      </Link>
    ));

    return (
      <ForecastWrapper>
        <Heading>Forecast</Heading>
        <DailyForecasts>{daily_forecast}</DailyForecasts>
      </ForecastWrapper>
    );
  }
}

export default Forecast;
