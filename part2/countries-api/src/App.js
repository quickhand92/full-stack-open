import React from "react";
import { useState } from "react";
import axios from "axios";
import { singleCountryData, capitalizeCountries } from "./utils/utils";

const api_key = process.env.REACT_APP_API_KEY

const FilteredCountries = ({ filtered, allCountry, showCountry }) => {
  if (filtered == null) return null
  if (filtered.length === 0) return null
  if (filtered.length > 10) return (<p>'Too many matches, specify another filter'</p>)

  const capitalizedFiltered = capitalizeCountries(filtered)

  if (filtered.length == 1) return singleCountryData(filtered, allCountry)

  // If filtered elements is between 2 and 9, all common names of countries in the filtered array is displayed.
  const filteredElements = capitalizedFiltered.map((country, index) => (<p key={index}>{country}<button onClick={() => showCountry(country)}>show</button></p>))
  return (<>
    {filteredElements}
  </>)

}

function App() {
  const [countryInput, setCountryInput] = useState(null)
  const [allCountry, setAllCountry] = useState(null)
  const [filtered, setFiltered] = useState([])

  if (allCountry == null) {
    axios.get('https://restcountries.com/v3.1/all').then(response => setAllCountry(response.data))
  }

  const handleCountryFilter = (event) => {
    setCountryInput(event.target.value)
    const allCountryNameArray = allCountry.map(country => country.name.common.toLowerCase())
    const filteredCountries = allCountryNameArray.filter(country => country.includes(event.target.value.toLowerCase()))
    setFiltered(filteredCountries)
  }

  const showCountry = (country) => {
    setFiltered([country])
  }
  return (
    <div>
      find countries<input onChange={handleCountryFilter}></input>
      <FilteredCountries showCountry={showCountry} filtered={filtered} allCountry={allCountry} />
    </div>
  );
}

export default App;
