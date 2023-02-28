import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    personService.getPersons().then((personList) => setPersons(personList));
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

    if (!persons.find((person) => person.name === newPerson.name)) {
      personService
        .addPerson(newPerson)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
    } else if (
      window.confirm(
        `${newPerson.name} already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const personToModify = persons.find(
        (person) => person.name === newPerson.name
      );
      const updatedPerson = { ...personToModify, number: newPerson.number };

      personService
        .updatePerson(personToModify.id, updatedPerson)
        .then((returnedPerson) =>
          setPersons(
            persons.map((person) =>
              person.id !== personToModify.id ? person : returnedPerson
            )
          )
        );
    }
    setNewName("");
    setNewNumber("");
  };

  const deleteHandle = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .deletePerson(id)
        .then(setPersons(persons.filter((person) => person.id !== id)));
    }
    return;
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
      <Persons namesToShow={namesToShow} deleteHandle={deleteHandle} />
    </div>
  );
};

export default App;
