import axios from "axios";

const newBaseUrl = "https://online-phonebook-rwjh.onrender.com"
const baseUrl = location.hostname === 'localhost' ? 'http://localhost:3001/api/numbers' : newBaseUrl+'/api/numbers'

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