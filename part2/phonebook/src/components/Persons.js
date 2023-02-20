import React from "react";

const Persons = ({namesToShow}) => {
return <>
{namesToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
</>
}

export default Persons