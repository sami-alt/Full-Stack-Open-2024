import { useEffect, useState } from "react"
import serverCalls from './ServerCallsCountry.jsx'

const RenderCountry = (props) => {
    const { country } = props
    const [weather, setWeather] = useState(null)

    const showWeather = () => {
        serverCalls
            .getWeather(country.name.common)
            .catch(() => console.log('error in weather render'))
            .then(respose => {
                setWeather(respose)
                console.log(weather)
            })
    }

    const displayWeather = (() => {
        if (!weather) {
            return <p></p>
        }
        if (weather) {
            return (
                <div>
                    <p> temperature {(weather.main.temp - 272.15).toFixed(1)} Celsius</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                    <p>wind {weather.wind.speed} ms/s</p>
                </div>
            )
        }
    })

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>Languages</h3>
            <ul>{Object.keys(country.languages).map((language, i) => (<li key={i}>{country.languages[language]}</li>))}</ul>
            <img src={country.flags.png} />
            <h1>weather in {country.name.common}</h1>
            <button onClick={showWeather}>Show weather</button>
            {/* button above to show weather that makes the call to weather service to avoid unnecessary api traffic */}
            {displayWeather()}
        </div>
    )
}

export default RenderCountry