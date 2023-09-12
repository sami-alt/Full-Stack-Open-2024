import RenderCountry from "./RenderCountry"

const RenderCountries = (props) => {
    const { countries } = props
    const { search } = props
    console.log('search in render', search)
    if (!countries) {
        return null
    }

    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    console.log('filtered in render', filtered.length)

    return (
        <div>
            {filtered.length > 10 ? <p>Too many matches, specify another filter</p> : filtered.length == 1 ? <RenderCountry country={filtered[0]}/> : <ul>{filtered.map((country, i) => <li key={i}>{country.name.common}</li>)}</ul>}
        </div>
    )

}

export default RenderCountries