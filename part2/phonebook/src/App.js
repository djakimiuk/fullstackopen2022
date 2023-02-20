import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

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
      
      <Filter filterValue={filterValue} setFilterValue={setFilterValue} persons={persons} handleFilterValueChange={handleFilterValueChange} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow}/>
    </div>
  );
};

export default App;
