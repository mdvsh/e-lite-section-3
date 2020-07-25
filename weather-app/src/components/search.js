import React from 'react'
import styled from 'styled-components'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = styled.form`
    position: relative;
    margin: 0 auto;
    max-width: 600px;
    transition: 0.8s 0.5s;
    top: ${({ weather }) => (weather ? '10%' : '50%')};
`

const SearchInput = styled.input`
    background-color: #ffffff;
    padding: 15px 20px 15px 45px;
    width: 100%;
    border: none;
    font-size: 18px;
    color: #888888;
    transition: 0.2s;
    border-radius: 30px;
    outline: none;
`

const Icon = styled.span`
    display: block;
    height: 16px;
    width: 16px;
    font-size: 16px;
    color: #888888;
    position: absolute;
    top: 50%;
    left: 25px;
    transform: translate(-50%, -50%);
`

class Search extends React.Component {
    render() {
        return (
            <SearchBar 
            onSubmit={this.props.submit}
            weather={this.props.weather}>
                <SearchInput 
                type="text" 
                value={this.props.value}
                placeholder="Weather in your city" 
                onChange={this.props.inp} />
                <Icon>
                    <FontAwesomeIcon icon={faSearch} />
                </Icon>
            </SearchBar>
        )
    }
}

export default Search
