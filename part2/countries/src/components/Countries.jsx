import { useEffect, useState } from 'react'

import Country from './Country'

const Countries = ({ countriesList, searchQuery }) => {
  const [selectedCountry, setSelectedCountry] = useState(false)

  useEffect(() => {
    setSelectedCountry(null)
  }, [searchQuery])

  const filteredCountries = countriesList
    .filter(country => (
      country.name.common.toLowerCase().includes(searchQuery.trim().toLowerCase())
    ))

  if(selectedCountry){
    return <Country country={selectedCountry} />
  }

  if(filteredCountries.length === 1){
    return <Country country={filteredCountries[0]} />
  }

  if(filteredCountries.length > 10){
    return <div>Too many matches, specify another filter</div>
  }

  return (
    <div>
      {filteredCountries.map(country => (
        <div key={country.ccn3}>
          {country.name.common} &nbsp;
          <button onClick={() => setSelectedCountry(country)}>Show</button>
        </div>
      ))}
    </div>
  )
}

export default Countries