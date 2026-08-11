const PersonForm = ({ newPerson, addPerson, handleNameChange, handleNumberChange }) => {
  return (
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
  )
}

export default PersonForm