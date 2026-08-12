const Person = ({ person, onDeleteClicked }) => {
  return (
    <div>
      {person.name} {person.number} &nbsp; 
      <button onClick={onDeleteClicked}>delete</button>
    </div>
  )
}

const Persons = ({ persons, searchQuery, onDeleteClicked }) => {
  return (
    <div>
      {persons
        .filter(
          person => person.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(
          person => <Person key={person.id} person={person} onDeleteClicked={() => onDeleteClicked(person.id)} />
        )
      }
    </div>
  )
}

export default Persons