
const RenderCountries = (props) => {
    const  {countries} = props
    const {search} = props
    console.log('search in render', search)
    if(!countries){
        return null
    }
    
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    
return(
    <div>
        <ul>
            {filtered.map((country, i) => <li key={i}>{country.name.common}</li>)}
        </ul>
    </div>
)

}

export default RenderCountries