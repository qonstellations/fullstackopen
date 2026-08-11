const Persons = ({ persons, searchQuery }) => {
  return (
    <div>
      {persons.filter(
        person => person.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(
            person => <div key={person.id}>{person.name} {person.number}</div>
          )
      }
    </div>
  )
}

export default Persons