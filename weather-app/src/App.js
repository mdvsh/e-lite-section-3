import React from 'react';
import './App.css'
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Search from './components/search.js'
import day from './images/day.jpg'
import night from './images/night.jpg'
import Weather from './components/weather.js'
import Forecast from './components/forecast.js'
import NotFound from './components/error.js'
import GoBackButton from './components/button.js'
const geoTz = require('geo-tz')

const Wrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  height: calc(100vh - 80px);
  width: 100%;
  position: relative;
  
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
    background-image: url(${({bg})=>(bg)});
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

function dateGetter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const todate = `${DAYS[a.getDay()]}, ${MONTHS[a.getMonth()]} ${a.getDate()}`
    return todate;
}
function dayGetter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const todate = `${DAYS[a.getDay()]}`
    return todate;
}  

class App extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            data: null,
            value: '',
            error: false,
            hrs: 0,
            forecast: null,
            backup: null,
            map: null
        }
        this.handleClick = this.handleClick.bind(this);
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
        const API = 'https://api.openweathermap.org/data/2.5/onecall'
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
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
                const todate = `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}`
                const resu ={
                    date: todate,
                    day: `${DAYS[date.getDay()]}`,
                    timezone: tz || 'Asia/Kolkata',
                    city: dat.name,
                    lat: dat.coord.lat,
                    lon: dat.coord.lon,
                    country: dat.sys.country,
                    desc: dat.weather[0].description,
                    main: dat.weather[0].main,
                    weather: dat.main.temp,
                    high: dat.main.temp_max,
                    low: dat.main.temp_min,
                    fl: dat.main.feels_like,
                    clouds: dat.clouds.all,
                    humidity: dat.main.humidity,
                    ws: dat.wind.speed
                }
                const furl = `${API}?lat=${resu.lat}&lon=${resu.lon}&exclude=current,hourly,minutely&appid=${API_KEY}&units=metric`
                fetch(furl)
                    .then((res) => {
                        if (res.ok) {
                            return res.json()
                        }
                        else {
                            throw Error(res.statusText)
                        }
                    })
                    .then((data)=>{
                        const tzo = data.timezone_offset
                        let d = new Date()
                        const hrs = tzo/3600 + d.getUTCHours()
                        const fd = this.state.data
                        const datid = {
                            ...fd,
                            did: data.daily[0].dt
                        }
                        const mapping = new Object()
                        data.daily.slice(1).map(d =>(
                            mapping[dayGetter(d.dt)] = d.dt
                        ))
                        this.setState({
                            forecast: data.daily.slice(1),
                            hrs: hrs,
                            data: datid,
                            map: mapping
                        })
                    })
                    .catch((error)=>{
                        console.log(error)
                        this.setState({
                            value: 'Error! Enter a valid city.',
                            forecast: null,
                            error: true
                        })
                    })
                this.setState({
                    error: false,
                    data:resu,
                    backup:resu,
                    value:''
                })
                // console.log(this.state.data)
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    value: 'Error! Enter a valid city.',
                    data: null,
                    error: true,
                    forecast: null
                })
            })
    }

    handleClick(dayId) {
        
        const fd = this.state.forecast
        let day = fd.find(o => o.dt === dayId)    
        const sd = this.state.data
        const dayDat = {
            ...sd,
            did: dayId,
            date: dateGetter(dayId),
            day: dayGetter(dayId),
            high: day.temp.max,
            low: day.temp.min,
            humidity: day.humidity,
            ws: day.wind_speed,
            main: day.weather[0].main,
            desc: day.weather[0].description,
            clouds: day.clouds,
            fl: day.feels_like.day,
            weather: day.temp.day
        }
        this.setState({
            data: dayDat
        })
    }

    render() {
        const value = this.state.value
        const data = this.state.data
        const forecast = this.state.forecast
        const error = this.state.error
        const h = this.state.hrs
        const backup = this.state.backup

        let foo 
        if (h >= 0 && h < 8) {
            foo = night
        }
        else if (h >= 8 && h <= 19) {
            foo = day
        }
        else {
            foo = night
        }

        // function plsWork(obj)
        // { return obj && obj !== 'null' && obj !== 'undefined'; }

        return (
            <>
                <BG bg={foo}/>
                <Logo logo={data || error}>ReactJS Weather App</Logo>
                <Wrapper>
                <Search
                value={value}
                ShowWeather={data || error}
                inp={this.handleInput}
                submit={this.handleSearch}
                />
                <Router>
                    <Route exact={true} path="/" render={() => (
                        <React.Fragment>
                            {data && <Weather weather={backup} />}
                            {forecast && <Forecast forecast={forecast} onClick={(id) => this.handleClick(id)} />}
                       </React.Fragment>
                    )} />
                    <Route path="/:d/" render={({ match }) => (
                        // this.handleClick(map[match.params.d]),
                        <React.Fragment>
                            {/* {console.log(map[match.params.d])} */}
                            {(data && forecast) && <Weather weather={data} />}
                            <Link to="/">
                                { data && <GoBackButton /> }
                            </Link>
                        </React.Fragment>
                    )} />
                    {error && <NotFound error={error} />}
                </Router>
                </Wrapper>
            </>
        )
    }

}

export default App;