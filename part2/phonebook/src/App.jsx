import { useEffect, useState } from 'react'
import SearchPerson from './FilterPerson'
import AddPerson from './AddNumber'
import RenderNumbers from './RenderNumbers'
import serverCalls from './serverCalls'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(()=> {
     serverCalls
    .getAll()
    .then(response => setPersons(response))
  },[])

  const personDelete = (deletedId) => {
    const newPersonList = persons.filter(person => person.id !== deletedId)
    return setPersons(newPersonList)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchPerson persons={persons}/>
      <AddPerson persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <RenderNumbers persons={persons} onPersonDeleted={personDelete}/>
    </div>
  )
}

export default App
