
const Hello = (props) => {
  console.log(props)
  return(
    <div>
      <p>Hello {props.name}, you are {props.age} old</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 25
  return (
    <div>
      <p>Greetings</p>
      <Hello name={name} age={age} />
      <Hello name="Frank" age={15 + 5}/>
      
    </div>
  )
}

export default App