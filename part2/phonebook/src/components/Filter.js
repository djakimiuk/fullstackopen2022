import React from "react";

const Filter = ({ handleFilterValueChange, filterValue }) => {
  return (
    <>
      <span>filter shown with</span>
      <input value={filterValue} onChange={handleFilterValueChange} />
    </>
  );
};

export default Filter;
