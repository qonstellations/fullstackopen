import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  return axios
    .get(baseURL)
    .then(response => response.data)
}

const create = (personObject) => {
  return axios
    .post(baseURL, personObject)
    .then(response => response.data)
}

const modify = (id, updatedPerson) => {
  return axios
    .put(`${baseURL}/${id}`, updatedPerson)
    .then(response => response.data)
}

const remove = (id) => {
  return axios
    .delete(`${baseURL}/${id}`)
    .then(response => response.data)
}

export default { getAll, create, modify, remove }