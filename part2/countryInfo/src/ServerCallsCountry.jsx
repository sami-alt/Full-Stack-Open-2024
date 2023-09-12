import axios from 'axios'

const baseUrl ='https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
    const request = axios.get(baseUrl + 'all').catch(err => console.log(err, 'all countries'))
    return request.then(response => response.data)
}

const getCountry = (country) => {
    const request = axios.get(baseUrl + 'name/' + `${country}`).catch(err => console.log(err, 'spesic country'))
    return request.then(response => response.data)
}


export default {getAll, getCountry}