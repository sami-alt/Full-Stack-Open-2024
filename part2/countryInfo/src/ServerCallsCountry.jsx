import axios from 'axios'

const baseUrl ='https://studies.cs.helsinki.fi/restcountries/api/'
const apiKey = import.meta.env.VITE_WEATHER_KEY

const getAll = () => {
    const request = axios.get(baseUrl + 'all').catch(err => console.log(err, 'all countries'))
    return request.then(response => response.data)
}

const getCountry = (country) => {
    const request = axios.get(baseUrl + 'name/' + `${country}`).catch(err => console.log(err, 'spesic country'))
    return request.then(response => response.data)
}

const getWeather = (city) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).catch(err=> console.log(err, 'weather api'))
    return request.then(response => response.data)
}

export default {getWeather, getAll, getCountry}