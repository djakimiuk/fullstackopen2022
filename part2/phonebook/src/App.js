import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [notificationMsg, setNotificationMsg] = useState({
    body: null,
    error: false,
  });

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

    const existingPersonInPhonebook = persons.find(
      (person) => person.name === newPerson.name
    );

    if (!existingPersonInPhonebook) {
      personService
        .addPerson(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotificationMsg({
            body: `Added ${returnedPerson.name}`,
            error: false,
          });
          setTimeout(() => {
            setNotificationMsg({ body: null, error: false });
          }, 5000);
        })
        .catch((error) => {
          setNotificationMsg({
            body: `${error.response.data.error}`,
            error: true,
          });
          setTimeout(() => {
            setNotificationMsg({ body: null, error: false });
          }, 5000);
          console.log(error.response.data.error);
        });
    } else if (
      window.confirm(
        `${newPerson.name} already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const updatedPerson = {
        ...existingPersonInPhonebook,
        number: newPerson.number,
      };

      personService
        .updatePerson(existingPersonInPhonebook.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== existingPersonInPhonebook.id
                ? person
                : returnedPerson
            )
          );
          setNotificationMsg({
            body: `Updated ${newPerson.name}'s number to ${newPerson.number}`,
            error: false,
          });
          setTimeout(() => {
            setNotificationMsg({ body: null, error: false });
          }, 5000);
        })
        .catch((error) => {
          setNotificationMsg({
            body: `Information of ${newPerson.name} has already been removed from server`,
            error: true,
          });
          setPersons(
            persons.filter(
              (person) => person.id !== existingPersonInPhonebook.id
            )
          );
          setTimeout(() => {
            setNotificationMsg({ body: null, error: false });
          }, 5000);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const deleteHandle = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .deletePerson(id)
        .then(setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => {
          setNotificationMsg({
            body: `Information of ${personToDelete.name} has already been removed from server`,
            error: true,
          });
          setPersons(
            persons.filter((person) => person.id !== personToDelete.id)
          );
          setTimeout(() => {
            setNotificationMsg({ body: null, error: false });
          }, 5000);
        });
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
      <Notification message={notificationMsg} />

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
