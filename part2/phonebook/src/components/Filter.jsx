const Filter = ({ searchQuery, handleSearchQuery }) => {
  return (
    <div>
    filter shown with <input type="text" value={searchQuery} onChange={handleSearchQuery} />
    </div>
  )
}

export default Filter