import weatherService from '../services/openweather'
import { useState, useEffect } from 'react'



const WeatherWidget = ({lat, lon}) => {

    const [weather, setWeather] = useState('')

    useEffect(() => {
        weatherService.getCurrentWeather(lat, lon)
            .then(weather => {
                console.log(weather)
                setWeather(weather)
        })
    },[])

    if (weather) {
        
        return (
            <div>
                <h3>Current weather:</h3>
                <p>Temperature: {weather.main.temp}</p>
                <p>Condition: {weather.weather[0].main}</p>
                <p>Wind speed: {weather.wind.speed}</p>
            </div>  
    )
    } else {
        return null
    }
}

export default WeatherWidget