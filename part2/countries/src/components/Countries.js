import React from "react";

const Countries = ({ countriesList }) => {
  return (
    <>
      {countriesList.length > 1 && countriesList.length <= 10
        ? countriesList.map((country) => (
            <p key={country.name.common}>
              <span>{country.name.common} </span>
              <button>show</button>
            </p>
          ))
        : null}
    </>
  );
};

export default Countries;
