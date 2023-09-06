import { useState } from 'react'
import SearchPerson from './FilterPerson'
import AddPerson from './AddNumber'
import RenderNumbers from './RenderNUmbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
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
