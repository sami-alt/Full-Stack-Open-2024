import DeletePerson from "./Deleteperson"

const RenderNumbers = (props) => {
    const {persons} = props

    const onPersonDeleted = () => {
        location.reload()
    }

    return(
        <div>
            <ul>
               {persons.map(person => <li key={person.id}>{person.name} {person.number} <DeletePerson onPersonDeleted={props.onPersonDeleted} person={person}/></li>) }
            </ul>
        </div>
    )
}

export default RenderNumbers