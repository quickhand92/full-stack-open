import React from "react";

import { useState } from 'react'

const Persons = ({persons, filter}) => {
  const filtered = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
  return(
    filtered.map(person => <div key={person.name}>{person.name} {person.number}</div>)
  )
}

const FilterInput = ({value, onChange}) => <div>
  filter shown with <input value={value} onChange={onChange}/>
</div>

const PersonForm = ({onSubmit,nameValue,nameChange,numberValue,numberChange}) => {
  return (
    <form onSubmit={onSubmit}>
        <div>
          name: <input value={nameValue} onChange={nameChange} />
        </div>
        <div>
          number: <input value={numberValue} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    if(persons.find(object => object.name.toLowerCase() == personObject.name.toLowerCase())){
      alert(`${personObject.name} is already added to phonebook`)
      return  
    }

    if(persons.find(object => object.number == personObject.number)){
      alert(`Number ${personObject.number} is already added to phonebook`)
      return  
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange=(event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput value={search} onChange={handleSearchChange}/>
      <h2>Add a new</h2>
      <PersonForm onSubmit={handleSubmit} nameValue={newName} nameChange={handleNameChange} numberValue={newNumber} numberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={search} />
    </div>
  )
}

export default App