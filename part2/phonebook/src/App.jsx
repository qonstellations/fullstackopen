import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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
      const personObject = {
        name: newPerson.name,
        number: newPerson.number,
        id: persons.length+1
      }
      setPersons([...persons, personObject])
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

      <Filter searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} />

      <h3>add a new</h3>

      <PersonForm 
        newPerson={newPerson} 
        addPerson={addPerson} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />

      <h3>Numbers</h3>
      
      <Persons persons={persons} searchQuery={searchQuery} />
    </div>
  )
}

export default App