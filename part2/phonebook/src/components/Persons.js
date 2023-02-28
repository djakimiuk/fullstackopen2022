import React from "react";

const Persons = ({ namesToShow, deleteHandle }) => {
  return (
    <>
      {namesToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deleteHandle(person.id)}>
            Delete
          </button>
        </p>
      ))}
    </>
  );
};

export default Persons;
