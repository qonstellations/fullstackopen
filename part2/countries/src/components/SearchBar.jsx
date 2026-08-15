import { useState } from 'react'

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div>
      find countries : &nbsp;
      <input type="text" value={searchQuery} onChange={handleSearchQueryChange} />
    </div>
  )
}

export default SearchBar