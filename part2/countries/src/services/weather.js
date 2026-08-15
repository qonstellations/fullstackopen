import axios from 'axios'

const baseURL = 'https://api.openweathermap.org/data/2.5'

const getWeather = async (lat, lon) => {
  return await axios
    .get(`${baseURL}/weather`, {
      params: {
        lat: lat,
        lon: lon,
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
        units: 'metric' 
      }
    })
    .then(response => response.data)
}

export default { getWeather }