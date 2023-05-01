import React from "react";
import { useState } from "react";
import axios from "axios";

const Filter = ({ filtered, allCountry }) => {
  if (filtered.length == 0) return
  if (filtered.length > 10) return (<p>'Too many matches, specify another filter'</p>)
  const capitalizedFiltered = filtered.map(country => {
    return country.split(" ").map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
  });

  if (filtered.length == 1) {
    const targetCountry = allCountry.find(country => country.name.common.toLowerCase() == filtered[0].toLowerCase())

    const languageArray = []
    for (const key in targetCountry.languages) {
      languageArray.push(targetCountry.languages[key])
    }

    const languageElements = languageArray.map((language, index) => {
      return <li key={index}>{language}</li>
    })

    return (
      <div>
        <h1>{targetCountry.name.common}</h1>
        <p>capital {targetCountry.capital[0]}</p>
        <p>area {targetCountry.area}</p>
        <h3>languages:</h3>
        <ul>{languageElements}</ul>
        <img src={targetCountry.flags.png} alt={targetCountry.flags.alt} />
      </div>
    )
  }

  const filteredElements = capitalizedFiltered.map((country, index) => (<p key={index}>{country}</p>))
  return (<>
    {filteredElements}
  </>)
}

function App() {
  const [country, setCountry] = useState(null)
  const [allCountry, setAllCountry] = useState(null)
  const [filtered, setFiltered] = useState([])

  if (allCountry == null) {
    axios.get('https://restcountries.com/v3.1/all').then(response => setAllCountry(response.data))
  }

  const handleCountry = (event) => {
    setCountry(event.target.value)
    const allCountryNameArray = allCountry.map(country => country.name.common.toLowerCase())
    const filteredCountries = allCountryNameArray.filter(country => country.includes(event.target.value.toLowerCase()))
    setFiltered(filteredCountries)
  }

  return (
    <div>
      find countries<input onChange={handleCountry}></input>
      <Filter filtered={filtered} allCountry={allCountry} />
    </div>
  );
}

export default App;
