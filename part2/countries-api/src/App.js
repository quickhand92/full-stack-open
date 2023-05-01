import React from "react";
import { useState } from "react";
import axios from "axios";
import { singleCountryData, capitalizeCountries } from "./utils/utils";

const FilteredCountries = ({ filtered, allCountry }) => {
  if (filtered == null) return null
  if (filtered.length === 0) return null
  if (filtered.length > 10) return (<p>'Too many matches, specify another filter'</p>)

  const capitalizedFiltered = capitalizeCountries(filtered)

  if (filtered.length == 1) return singleCountryData(filtered, allCountry)

  // If filtered elements is between 2 and 9, all common names of countries in the filtered array is displayed.
  const filteredElements = capitalizedFiltered.map((country, index) => (<p key={index}>{country}</p>))
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

  return (
    <div>
      find countries<input onChange={handleCountryFilter}></input>
      <FilteredCountries filtered={filtered} allCountry={allCountry} />
    </div>
  );
}

export default App;
