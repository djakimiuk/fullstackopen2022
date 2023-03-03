import React from "react";

const Countries = ({ countriesList }) => {
  return (
    <>
      {countriesList.length > 1 && countriesList.length <= 10
        ? countriesList.map((country) => <p key={country.name.common}>{country.name.common}</p>)
        : null}
    </>
  );
};

export default Countries;
