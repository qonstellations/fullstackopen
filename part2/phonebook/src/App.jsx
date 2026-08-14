import { useState, useEffect } from 'react'

import personService from './services/persons'

import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name:'', number:'', id:'' })
  const [searchQuery, setSearchQuery] = useState('')
  const [message, setMessage] = useState({ content:'', isSuccess:null })
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  useEffect(() => {
    if(!showNotification) return;

    const timer = setTimeout(() => {
      setShowNotification(false)
      setMessage({ content:'', isSuccess:null })
    }, 3000)

    return () => clearTimeout(timer)
  }, [showNotification])

  const addPerson = (event) => {
    event.preventDefault()
    const isFound = persons.find(person => person.name.trim().toLowerCase() === newPerson.name.toLowerCase())
    
    if(isFound){
      updatePerson(isFound.id)
    }
    else{
      if(name === '' || number === null){
        setMessage({ content:'All fields are compulsory!', isSuccess: false })
        setShowNotification(true)
        return
      }

      const personObject = {
        name: newPerson.name,
        number: newPerson.number,
      }
      personService
        .create(personObject)
        .then(newPersonObject => {
          setPersons([...persons, newPersonObject])
          setMessage({ content: `Added ${personObject.name}`, isSuccess: true })
          setShowNotification(true)
        })
        .catch(error => {
          console.log(`error while adding contact : ${error}`)
          setMessage({ content:'Failed to add contact', isSuccess: false })
          setShowNotification(true)
        })
    }
    setNewPerson({ name: '', number: '', id: '' })
  }

  const deletePerson = (id) => {
    const conf = confirm("are you sure you want to delete this contact?")
    if(conf === true){
      personService
        .remove(persons.find(person => person.id === id).id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log(`error while deleting contact : ${error}`)
          setMessage({ content:'Failed to delete contact (already deleted)', isSuccess: false })
          setShowNotification(true)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const updatePerson = (id) => {
    const conf = confirm(`Do you want to update contact details?`)
    if(conf){
      const currentPerson = persons.find(person => person.id === id)
      const changedPerson = {
        ...currentPerson,
        number: newPerson.number
      }

      personService
        .modify(id, changedPerson)
        .then(updatedPersonObject => {
          setPersons(persons.map(person => (person.id === id) ? updatedPersonObject : person))
          setNewPerson({ name: '', number: '', id: '' })
        })
        .catch(error => {
          setMessage({ 
            content:`Information of ${currentPerson.name} has already been removed from the server!`,
            isSuccess: false
          })
          setShowNotification(true)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleNameChange = event => setNewPerson({...newPerson, name: event.target.value })
  const handleNumberChange = event => setNewPerson({...newPerson, number: event.target.value })
  const handleSearchQuery = event => setSearchQuery(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      {showNotification && <Notification message={message} />}

      <Filter searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} />

      <h3>add a new</h3>

      <PersonForm 
        newPerson={newPerson} 
        addPerson={addPerson} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />

      <h3>Numbers</h3>
      
      <Persons persons={persons} searchQuery={searchQuery} onDeleteClicked={(id) => deletePerson(id)} />
    </div>
  )
}

export default App