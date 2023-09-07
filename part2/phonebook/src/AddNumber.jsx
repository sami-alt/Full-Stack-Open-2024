import { useState } from "react"
import serverCalls from "./serverCalls"

const AddPerson = (props) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const {persons, setPersons} = props
           
    const addPerson = (event) => {
        event.preventDefault()
        
        const isDublicate =() => persons.find(person => person.name === newName)
        const empty = isDublicate() === undefined
        const toUpdate = isDublicate()
        const updated = {...toUpdate, number: newNumber}
        
        if (!empty) {
            if(confirm(`${newName} is already added to phonebook, replace the old number with a new one`)){
            serverCalls
            .updatePerson(toUpdate.id, updated)
            .then(() => props.onNumberUpdated(updated.number, updated.id))
          }
            return
          }
          serverCalls.createPerson({name: newName, number:newNumber}).then(response => setPersons(persons.concat(response))) 
    }

    const handleInputName = (event) => {
        setNewName(event.target.value)
      }
    
      const handleInputNumber = (event) => {
        setNewNumber(event.target.value)
      }

    return(
        <form onSubmit={addPerson}>
        <h2>add new</h2>
        <div>
          name: <input onChange={handleInputName} />
        </div>
        <div>
          number: <input onChange={handleInputNumber} />
        </div>
        <div>
          <button type="submit"> add</button>
        </div>
      </form>
    )
}

export default AddPerson
