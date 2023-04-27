// @ts-nocheck
import React from "react";
import axios from "axios"
import { useState, useEffect } from 'react'
import personService from '../src/services/persons'

const Persons = ({ persons, filter }) => {
  const filtered = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    filtered.map(person => <div key={person.name}>{person.name} {person.number}</div>)
  )
}

const FilterInput = ({ value, onChange }) => <div>
  filter shown with <input value={value} onChange={onChange} />
</div>

const PersonForm = ({ onSubmit, nameValue, nameChange, numberValue, numberChange }) => {
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(object => object.name.toLowerCase() == personObject.name.toLowerCase())) {
      alert(`${personObject.name} is already added to phonebook`)
      return
    }
    if (persons.find(object => object.number == personObject.number)) {
      alert(`Number ${personObject.number} is already added to phonebook`)
      return
    }
    personService.add(personObject).then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput value={search} onChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={handleSubmit} nameValue={newName} nameChange={handleNameChange} numberValue={newNumber} numberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={search} />
    </div>
  )
}

export default App