import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name:'', number:'', id:undefined })
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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

  const handleNameChange = event => setNewPerson({...newPerson, name: event.target.value })
  const handleNumberChange = event => setNewPerson({...newPerson, number: event.target.value })
  const handleSearchQuery = event => setSearchQuery(event.target.value)

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