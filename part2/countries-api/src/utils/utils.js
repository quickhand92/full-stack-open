// @ts-nocheck
import React from "react"




const convertKelvinToCelcius = (kelvin) => {
    const celsius = kelvin - 273.15;
    return celsius;
}

const singleCountryData = (filtered, allCountry) => {
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
            <h1>Weather in {targetCountry.capital[0]}</h1>
        </div>
    )
}

const capitalizeCountries = (filtered) => {
    const capitalizedFiltered = filtered.map(country => {
        return country.split(" ").map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(" ");
    });

    return capitalizedFiltered
}
export { singleCountryData, capitalizeCountries, convertKelvinToCelcius }

