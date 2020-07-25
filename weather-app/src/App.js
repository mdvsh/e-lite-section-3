import React from 'react';
import './App.css'
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import Search from './components/search.js'
import mo from './images/6.jpg'
import af from './images/12.jpg'
import ev from './images/0.jpg'

const geoTz = require('geo-tz')

const Wrapper = styled.div`
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: calc(100vh - 70px);
`;

const Logo = styled.h1`
    display: block;
    color: #ffffff;
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 1px;
    margin: 0;
    padding: 20px 0;
    transition: 0.5s 1.5s;
    opacity: ${({ logo }) => (logo ? 1 : 0)};  
  `


const BG = createGlobalStyle`
    body::before {
    background-image: url('${props => props.value}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    content: "";
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transition: 1.5s ease-in;
    }
`

class App extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            data: null,
            value: '',
            error: false,
            hrs: 0
        }
    }

    handleInput = event => {
        this.setState({
            value: event.target.value
        })
    }

    handleSearch = event => {
        event.preventDefault()
        const value = this.state.value
        const BASE_API = 'https://api.openweathermap.org/data/2.5/weather'
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
        const MONTHS = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'Nocvember',
            'December',
            ]

        const DAYS = [
            'Sunday', 
            'Monday', 
            'Tuesday', 
            'Wednesday', 
            'Thursday', 
            'Friday', 
            'Saturday'
            ]
            
        const wurl = `${BASE_API}?q=${value}&APPID=${API_KEY}&units=metric`
        fetch(wurl)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    throw Error(res.statusText)
                }
            })
            .then((dat) => {
                const date = new Date()
                const tz = String(geoTz(dat.coord.lat, dat.coord.lon))
                const todate = `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`
                const res ={
                    todate,
                    timezone: tz || 'Asia/Kolkata',
                    city: dat.name,
                    country: dat.sys.country,
                    desc: dat.weather[0].description,
                    main: dat.weather[0].main,
                    weather: dat.main.temp,
                    high: dat.main.temp_max,
                    low: dat.main.temp_min,
                    fl: dat.main.feels_like,
                    clouds: dat.clouds.all,
                    humidity: dat.main.humidity,
                }
                console.log(dat)
                this.setState({
                    value: '',
                    data: res,
                    error: false
                })
                fetch(`http://worldtimeapi.org/api/timezone/${this.state.data.timezone}`)
                    .then((res) => {
                        if (res.ok) {
                            return res.json()
                        }
                        else {
                            throw Error(res.statusText)
                        }                
                    })
                    .then((d) => {
                        console.log(d)
                        let ht = new Date().toLocaleString("en-US", {timeZone: d.timezone})
                        ht = String(ht)
                        let foo
                        var o = ht.substring(ht.indexOf(" "), ht.indexOf(":"))
                        if (ht.includes('PM')) {
                            foo = (o-0)+12
                        }
                        else {
                            foo = o-0
                        }
                        this.setState({
                            hrs: foo
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                console.log(this.state.data)
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    value: 'Error! Enter a valid city.',
                    data: null,
                    error: true
                })
            })
    }

    render() {
        const data = this.state.data
        const value = this.state.value
        const error = this.state.error
        const h = this.state.hrs
        let foo 
        if (h >= 0 && h < 8) {
            foo = mo
        }
        else if (h >= 8 && h < 16) {
            foo = af
        }
        else {
            foo = ev
        }
        return (
            <>
                <BG value={foo}/>
                <Logo logo={data || error}>ReactJS Weather App</Logo>
                <Wrapper>
                <Search
                value={value}
                weather={data || error}
                inp={this.handleInput}
                submit={this.handleSearch}
                />
                </Wrapper>
            </>
        )
    }

}

export default App;