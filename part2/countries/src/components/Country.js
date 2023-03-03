import React from "react";

const Country = ({ countriesList }) => {
  const languages = countriesList.map((country) => country.languages);
  const obj = languages[0];
  const languagesValues = obj ? Object.values(obj) : [];
  return countriesList.length === 1 ? (
    <>
      {countriesList.map((country) => (
        <>
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
        </>
      ))}
    </>
  ) : null;
};

export default Country;
