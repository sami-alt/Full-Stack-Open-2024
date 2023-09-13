import DeletePerson from "./Deleteperson"

const RenderNumbers = (props) => {
    const {persons} = props
    console.log('front render persons', persons)

    return(
        <div>
            <ul>
               {persons.map(person => <li key={person.id}>{person.name} {person.number} 
               <DeletePerson onPersonDeleted={props.onPersonDeleted} person={person} setMessage={props.setMessage}/></li>)}
            </ul>
        </div>
    )
}

export default RenderNumbers