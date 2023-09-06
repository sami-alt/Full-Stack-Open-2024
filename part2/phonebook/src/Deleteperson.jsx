import { useState } from "react"
import serverCalls from "./serverCalls"


const DeletePerson = (props) =>{
    const {person} = props

    const deletePerson = (event) =>{
        event.preventDefault()
        const personToDelete =  person.name 
        confirm('delete ' + personToDelete + '?' )
        serverCalls
        .deletePerson(person.id)
        .then(() => props.onPersonDeleted(person.id))
    }

    return (
        <div>
            <button onClick={deletePerson}>delete</button>
        </div>
    )

}

export default DeletePerson