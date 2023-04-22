import React from "react";

import { useState } from 'react'

const Numbers = ({names}) => 
names.map(names => <div key={names.name}>{names.name}</div>)


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    
    const nameObject = {
      name: newName
    }

    if(persons.find(object => object.name == nameObject.name))
    alert(`${nameObject.name} is already added to phonebook`)
    return

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers names={persons} />
    </div>
  )
}

export default App