import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAllCountries = async () => {
  return await axios
    .get(`${baseURL}/all`)
    .then(response => response.data)  
}

export default { getAllCountries }