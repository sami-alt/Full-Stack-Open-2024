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

  const onNumberUpdated = (updatedNum, id) => {
    const updatedPersons = persons.map(number => {
      if(id === number.id){
        const update = {...number, number:updatedNum}
        return update
      } else {
        return number
      }
    })
     return setPersons(updatedPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchPerson persons={persons}/>
      <AddPerson persons={persons} setPersons={setPersons} onNumberUpdated={onNumberUpdated}/>
      <h2>Numbers</h2>
      <RenderNumbers persons={persons} onPersonDeleted={personDelete}/>
    </div>
  )
}

export default App
