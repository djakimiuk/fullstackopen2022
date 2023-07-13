import axios from "axios";
const baseUrl = "/api/persons";

const getPersons = () => axios.get(baseUrl).then((response) => response.data);

const getPerson = (id) =>
  axios.get(`${baseUrl}/${id}`).then((response) => response.data);

const addPerson = (newPerson) =>
  axios.post(baseUrl, newPerson).then((response) => response.data);

const updatePerson = (id, updatedPerson) =>
  axios
    .put(`${baseUrl}/${id}`, updatedPerson)
    .then((response) => response.data);

const deletePerson = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((response) => response.data);

export default {
  getPersons,
  getPerson,
  addPerson,
  updatePerson,
  deletePerson,
};
