import { useState } from "react"
import serverCalls from "./serverCalls"


const DeletePerson = (props) =>{
    const {person} = props

    const deletePerson = (event) =>{
        event.preventDefault()
        const personToDelete = person.name 
        confirm('delete ' + personToDelete + '?' )
        serverCalls
        .deletePerson(person.id)
        .catch(()=>{props.setMessage({content:`Person  ${person.name}  has alredy been deleted`, type:'error' })})
        .then(() => props.onPersonDeleted(person.id), props.setMessage({content:`Person ${person.name} has been deleted`}))
    }

    return (
        <div>
            <button onClick={deletePerson}>delete</button>
        </div>
    )

}

export default DeletePerson