import { useEffect, useState } from 'react'
import SearchPerson from './FilterPerson'
import AddPerson from './AddNumber'
import RenderNumbers from './RenderNumbers'
import serverCalls from './serverCalls'
import Message from './Message'

const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  
  useEffect(() => {
    serverCalls
      .getAll()
      .catch((err
        ) => {
        setMessage({content:'No contact list found', type:'error'})
        setTimeout(() => { setMessage(null), 5000 })
      })
      .then(response => setPersons(response))
  }, [])
  
  const personDelete = (deletedId) => {
    const newPersonList = persons.filter(person => person.id !== deletedId)
    return setPersons(newPersonList)
  }

  const onNumberUpdated = (updatedNum, id) => {
    const updatedPersons = persons.map(number => {
      if (id === number.id) {
        const update = { ...number, number: updatedNum }
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
      <Message message={message} setMessage={setMessage}/>
      <SearchPerson persons={persons}  />
      <AddPerson persons={persons} setPersons={setPersons} onNumberUpdated={onNumberUpdated} setMessage={setMessage}/>
      <h2>Numbers</h2>
      <RenderNumbers persons={persons} onPersonDeleted={personDelete} setMessage={setMessage}/>
    </div>
  )
}

export default App
