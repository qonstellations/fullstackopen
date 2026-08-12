import { useState, useEffect } from 'react'
import axios from 'axios'

import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name:'', number:'', id:'' })
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
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
      }
      personService
        .create(personObject)
        .then(newPersonObject => {
          setPersons([...persons, newPersonObject])
        })
    }
    setNewPerson({ name: '', number: '', id: '' })
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