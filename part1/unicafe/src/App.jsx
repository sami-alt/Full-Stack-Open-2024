import { useState } from 'react'

const Button = (props) => (
  
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.value} {props.percent}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  const getNums = (props) => (props.good + props.neutral + props.bad)
  const total = getNums(props)

    if(getNums(props) === 0){
      return(
        <div>
          <h1>statistics</h1>
          no feedback given
          </div>
      )
    }
  
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text='good' value={props.good} />
          <StatisticsLine text='neutral' value={props.neutral} />
          <StatisticsLine text='bad' value={props.bad} />
          <StatisticsLine text='all' value={props.good + props.neutral + props.bad} />
          <StatisticsLine text='average' value={(((1 * props.good) + (0 * props.neutral) + (-1 * props.bad)) / total).toFixed(1)} />
          <StatisticsLine text='positive' value={((props.good /total)*100).toFixed(0)} percent='%' />
        </tbody>
      </table>
    </div>
  )

}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <span>
        <Button handleClick={() => { setGood(good + 1); setTotal(total + 1) }} text='good' />
        <Button handleClick={() => { setNeutral(neutral + 1); setTotal(total + 1) }} text='neutral' />
        <Button handleClick={() => { setBad(bad + 1); setTotal(total + 1) }} text='bad' />
      </span>
      <div>
        <Statistics good={good} bad={bad} neutral={neutral} />
      </div>
    </div>
  )
}

export default App