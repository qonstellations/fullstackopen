import { useState, useEffect } from 'react'

import weatherService from '../services/weather'
import weather from '../services/weather'

const WeatherIcon = ({ weatherIconId }) => {
  const iconURL = `https://openweathermap.org/payload/api/media/file/${weatherIconId}.png`
  return (
    <div>
      <img src={iconURL} alt="weather icon" />
    </div>
  )
}

const Weather = ({ country }) => {
  const [temperature, setTemperature] = useState(null)
  const [windSpeed, setWindSpeed] = useState(null)
  const [weatherIconId, setWeatherIconId] = useState(null)

  const [lat, lon] = country.capitalInfo.latlng

  useEffect(() => {
    weatherService
      .getWeather(lat, lon)
      .then(response => {
        setTemperature(response.main.temp)
        setWindSpeed(response.wind.speed)
        setWeatherIconId(response.weather[0].icon)
      })
      .catch(error => {
        console.error(`Error in fetching weather : ${error}`)
      })
  }, [country])

  return (
    <div>
      <h1>Weather in {country.capital[0]}</h1>

      <p>Temperature {temperature} Celsius</p>
      {weatherIconId && <WeatherIcon weatherIconId={weatherIconId} />}

      <p>Wind {windSpeed} m/s</p>
    </div>
  )
}

export default Weather