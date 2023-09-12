
const RenderCountry = (props) => {
    const {country} = props
    console.log('single country', country)
    console.log('languages', country.languages)
    console.log('languages', Object.keys(country.languages).length)
    console.log('flag',typeof country.flag)
    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>Languages</h3>
            <ul>{Object.keys(country.languages).map((key,i) => (<li key={i}>{country.languages[key]}</li>))}</ul>
            <img src={country.flags.png}/>
        </div>
    )
}

export default RenderCountry