import { useEffect, useState } from 'react'
import SearchCountries from './SearchCountries'
import RenderCountries from './RendeCountries'
import serverCalls from './ServerCallsCountry.jsx'

function App() {
  const [countries, setCountries] = useState(null)
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!countries) {
      serverCalls
        .getAll()
        .catch(() => console.log('cant get countries front'))
        .then(response => {
          setCountries(response)
        })
    }
  }, [])

  return (
    <div>
      <SearchCountries search={search} setSearch={setSearch}  setShow={setShow}/>
      <RenderCountries countries={countries} search={search} show={show} setShow={setShow}/>
    </div>
  )
}

export default App
