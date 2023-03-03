import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Country from "./components/Country";

const App = () => {
  const [filterValue, setFilterValue] = useState("");
  const [countries, setCountries] = useState([]);
  const URL = `https://restcountries.com/v3.1/all`;
  useEffect(() => {
    axios
      .get(URL)
      .then((response) => response.data)
      .then((countriesList) => setCountries(countriesList))
      .catch((error) => console.log(`There was an error ${error}`));
  });

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const countriesToDisplay = filterValue
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filterValue.toLowerCase())
      )
    : [];

  return (
    <div>
      <span>find countries</span>
      <input value={filterValue} onChange={handleFilterValueChange} />
      {countriesToDisplay.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : null}
      <Countries countriesList={countriesToDisplay} />
      <Country countriesList={countriesToDisplay} />
    </div>
  );
};

export default App;
