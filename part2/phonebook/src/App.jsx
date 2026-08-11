import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newPerson, setNewPerson] = useState({ name:'', number:'', id:undefined })
  const [searchQuery, setSearchQuery] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const isFound = persons.some(
      person => person.name.trim().toLowerCase() === newPerson.name.toLowerCase()
    )
    if(isFound){
      window.alert(`${newPerson.name} is already added to phonebook`)
    }
    else{
      newPerson.id = persons.length+1
      setPersons([...persons, newPerson])
    }

    setNewPerson({ name: '', number: '', id: undefined })
  }

  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value })
  }

  const handleNumberChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value })
  }

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with <input type="text" value={searchQuery} onChange={handleSearchQuery} />
      </div>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input type='text' value={newPerson.name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input type='text' value={newPerson.number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.filter(
          person => person.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(
            person => <div key={person.id}>{person.name} {person.number}</div>
          )
      }
    </div>
  )
}

export default App