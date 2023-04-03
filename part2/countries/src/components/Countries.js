import React from "react";
import Country from "./Country";
import { useState } from "react";

const Countries = ({ countriesList }) => {
  const [selectedCountry, setSelectedCountry] = useState([]);
  const clickHandler = (country) => {
    setSelectedCountry([...selectedCountry, country]);
  };
  return (
    <>
      {countriesList.length > 1 && countriesList.length <= 10
        ? countriesList.map((country) => (
            <div key={country.name.common}>
              <p>
                <span>{country.name.common} </span>
                <button onClick={() => clickHandler(country.name.common)}>
                  show
                </button>
              </p>
              {selectedCountry.includes(country.name.common) ? (
                <Country countriesList={[country]} />
              ) : null}
            </div>
          ))
        : null}
    </>
  );
};

export default Countries;
