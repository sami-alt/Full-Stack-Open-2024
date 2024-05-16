import axios from "axios";

const newBaseUrl = "https://online-phonebook-rwjh.onrender.com"
const baseUrl = location.hostname === 'localhost' ? 'http://localhost:3001/api/numbers' : newBaseUrl + '/api/numbers'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => {
        return response.data
    })
}

const updatePerson = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, createPerson, updatePerson, deletePerson }