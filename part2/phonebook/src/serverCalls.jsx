import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const  getAll = () => {
    const request = axios.get(baseUrl).catch(err => console.log(err))
    return request.then(response => response.data)
}

const createPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson).catch(err => console.log(err))
    return request.then(response => response.data)
}

const updatePerson = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson).catch(err => console.log(err))
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`).catch(err => console.log(err))
    return request.then(response => response.data)
}

export default { getAll, createPerson, updatePerson, deletePerson }