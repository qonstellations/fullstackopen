import { useState, useEffect } from 'react'

import SearchBar from './components/SearchBar'
import Countries from './components/Countries'

import countryService from './services/countries'
import countries from './services/countries'

const App = () => {
  const [countriesList, setCountriesList] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    countryService
      .getAllCountries()
      .then(countries => {
        setCountriesList(countries)
      })
      .catch(error => {
        console.log(`Error in fetching countries : ${error}`)
      })
  }, [])

  if(countriesList == null){
    return (
      <div>
        Fetching countries data from server...
      </div>
    )
  }

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Countries countriesList={countriesList} searchQuery={searchQuery} />
    </div>
  )
}

export default App