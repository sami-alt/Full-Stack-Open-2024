import RenderCountry from "./RenderCountry"

const RenderCountries = (props) => {
    const { countries } = props
    const { search } = props
    
    if (!countries) {
        return null
    }

    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    
    const contents = (() => {
        if (filtered.length > 10) {
            return <p>Too many matches, specify another filter</p>
        }
        if (filtered.length === 1) {
            return <RenderCountry country={filtered[0]} />
        }
        if (props.show) {
            return <RenderCountry country={props.show} /> 
        }
        return <ul>{filtered.map((country, i) => <li key={i}>{country.name.common}<button onClick={() => props.setShow(country)}>show</button></li>)}</ul>
    })()

    return (
        <div>
            {contents}
        </div>
    )

}

export default RenderCountries