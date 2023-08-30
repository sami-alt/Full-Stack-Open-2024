import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Display = (props) => (
  <div>{props.text} {props.value}</div>
)

const Statistics = () =>{
        <div>
        <Display  value={good} text='good'/>
        <Display  value={neutral} text='neutral'/>
        <Display  value={bad} text='bad'/>
        <Display  value={total} text='all'/>
        </div>
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total,setTotal] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <span>
        <Button handleClick={()=>{setGood(good + 1); setTotal(total + 1)}} text='good'/>
        <Button handleClick={()=>{setNeutral(neutral + 1); setTotal(total + 1)}} text='neutral'/>
        <Button handleClick={()=>{setBad(bad + 1); setTotal(total + 1)}} text='bad'/>
      </span>
      <h1>statistics</h1>
        <Statistics/>
    </div>
  )
}

export default App