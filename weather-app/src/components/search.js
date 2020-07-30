import React from "react";
import styled from "styled-components";
import { MdLocationSearching } from "react-icons/md";

const SearchBar = styled.form`
  position: relative;
  margin: 0 auto;
  max-width: 600px;
  transition: 0.5s 1s;
  top: ${({ weather }) => (weather ? "10%" : "50%")};
`;

const Input = styled.input`
  background-color: #ffffff;
  color: #888888;
  padding: 15px 20px 15px 45px;
  outline: none;
  width: 100%;
  border: none;
  border-radius: 30px;
  font-size: 1.25rem;
`;

const Icon = styled.span`
  display: block;
  color: #888888;
  height: 18px;
  width: 18px;
  font-size: 1.5rem;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translate(-50%, -50%);
`;

class Search extends React.Component {
  render() {
    return (
      <SearchBar onSubmit={this.props.submit} weather={this.props.ShowWeather}>
        <Input
          type="text"
          value={this.props.value}
          placeholder="Weather in your city"
          onChange={this.props.inp}
        />
        <Icon>
          <MdLocationSearching />
        </Icon>
      </SearchBar>
    );
  }
}

export default Search;
