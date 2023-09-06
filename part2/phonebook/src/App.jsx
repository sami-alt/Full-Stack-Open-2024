import { useEffect, useState } from 'react'
import SearchPerson from './FilterPerson'
import AddPerson from './AddNumber'
import RenderNumbers from './RenderNUmbers'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  },[])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchPerson persons={persons}/>
      <AddPerson persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <RenderNumbers persons={persons}/>
    </div>
  )
}

export default App
