import React from "react";
import { useState } from "react";
import axios from "axios";
import { singleCountryData, capitalizeCountries } from "./utils/utils";
import { useEffect } from "react";
import { convertKelvinToCelcius } from "./utils/utils"
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
  const [allCountry, setAllCountry] = useState(null)
  const [filtered, setFiltered] = useState([])
  const [capitalData, setCapitalData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentCapital, setCurrentCapital] = useState(null)

  if (allCountry == null) {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setAllCountry(response.data).catch(error => { console.log(error) })
    })
  }


  useEffect(() => {
    if (filtered.length === 1) {
      const targetCountry = allCountry.find(country => country.name.common.toLowerCase() === filtered[0].toLowerCase())
      setCurrentCapital(targetCountry.capital[0])
    }
    if (filtered.length == 0 || filtered.length > 1) {
      setCurrentCapital(null)
      setCapitalData(null)
    }
  }, [filtered])


  useEffect(() => {
    if (currentCapital) {
      setIsLoading(true); // set isLoading to true before making the API call
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${currentCapital}&appid=${api_key}`)
        .then(response => {
          setCapitalData(response.data);
          setIsLoading(false); // set isLoading to false once the data has been fetched
        })
        .catch(error => {
          console.log(error);
          setIsLoading(false); // set isLoading to false if there was an error fetching the data
        });
    }
  }, [currentCapital, setIsLoading]);

  const handleCountryFilter = (event) => {
    const allCountryNameArray = allCountry.map(country => country.name.common.toLowerCase())
    const filteredCountries = allCountryNameArray.filter(country => country.includes(event.target.value.toLowerCase()))
    setFiltered(filteredCountries)
    if (event.target.value == '') {
      setFiltered([])
    }
  }

  const showCountry = (country) => {
    setFiltered([country])
  }
  return (
    <div>
      find countries<input onChange={handleCountryFilter}></input>
      <FilteredCountries showCountry={showCountry} filtered={filtered} allCountry={allCountry} />
      {capitalData ? <p>Temperature : {convertKelvinToCelcius(capitalData.main.temp)} celcius</p> : null}
      {capitalData ? <img src={`https://openweathermap.org/img/wn/${capitalData.weather[0].icon}@2x.png`} /> : null}
      {capitalData ? <p>wind: {capitalData.wind.speed} m/s</p> : null}
    </div>
  );
}

export default App;
