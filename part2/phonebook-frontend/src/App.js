// @ts-nocheck
import React from "react";
import axios from "axios"
import { useState, useEffect } from 'react'
import personService from '../src/services/persons'

const Persons = ({ persons, filter, handleDelete }) => {
  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    filteredPersons.map(person => <div key={person.id}>{person.name} {person.number}<button onClick={() => handleDelete(person.id)}>delete</button></div>)
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

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage == null && errorMessage == null) {
    return
  }

  if (successMessage) {
    return (
      <p className="success">{successMessage}</p>
    )
  }

  if (errorMessage) {
    return (
      <p className="error">{errorMessage}</p>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(object => object.name.toLowerCase() == personObject.name.toLowerCase())) {
      const confirmed = window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)
      if (confirmed) {
        const selected = persons.find(person => person.name == personObject.name)
        personObject.id = selected.id
        axios.put(`/api/persons/${selected.id}`, personObject)
          .then((response) => {
            setPersons([response.data].concat(persons.filter(person => person.id !== selected.id)))
          }).catch((error) => {
            setErrorMessage(`Information of ${personObject.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
      else {
        console.log('not updated')
      }
      return
    }
    if (persons.find(object => object.number == personObject.number)) {
      alert(`Number ${personObject.number} is already added to phonebook`)
      return
    }
    personService.add(personObject).then(
      returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(`Added ${personObject.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
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

  const handleDelete = (id) => {
    const selected = persons.find(person => person.id === id)
    const confirmed = window.confirm(`Delete ${selected.name}`)
    if (confirmed) {
      axios.delete(`/api/persons/${id}`)
        .then(setPersons(persons.filter((person) => person.id != id)))
    } else {
      return
    }
  }

  useEffect(() => {
    axios
      .get(`/api/persons`)
      .then((response) => {
        setPersons(response.data)
      })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <FilterInput value={search} onChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={handleSubmit} nameValue={newName} nameChange={handleNameChange} numberValue={newNumber} numberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={search} handleDelete={handleDelete} />
    </div>
  )
}

export default App