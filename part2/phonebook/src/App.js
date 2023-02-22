import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const comparisonArr = persons.map((person) => JSON.stringify(person.name));
    if (comparisonArr.indexOf(JSON.stringify(newPerson.name)) < 0) {
      setPersons(persons.concat(newPerson));
    } else {
      alert(
        `${
          persons[comparisonArr.indexOf(JSON.stringify(newPerson.name))].name
        } already added to phonebook`
      );
    }
    setNewName("");
    setNewNumber("");
  };

  const namesToShow =
    filterValue === ""
      ? persons
      : persons.filter((person) => person.name.includes(filterValue));

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        persons={persons}
        handleFilterValueChange={handleFilterValueChange}
      />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} />
    </div>
  );
};

export default App;
