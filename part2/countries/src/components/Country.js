import React from "react";
import WeatherInfo from "./WeatherInfo";

const Country = ({ countryToDisplay }) => {
  const languages = countryToDisplay.map((country) => country.languages);
  const obj = languages[0];
  const languagesValues = obj ? Object.values(obj) : [];

  return countryToDisplay.length === 1 ? (
    <>
      {countryToDisplay.map((country) => (
        <div key={country.name.common}>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
          <h3>languages:</h3>
          <ul>
            {languagesValues.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            src={country.flags.png}
            alt={country.flags.alt}
            width={150}
            height={150}
          />
          <WeatherInfo capitalCity={country.capital[0]} />
        </div>
      ))}
    </>
  ) : null;
};
export default Country;
