import { useState } from 'react'

const Button = (props) => (<button onClick={props.handleClick}>{props.text}</button>)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.from({length: 8}).fill(0))

  const getRandomInt = () => (Math.floor(Math.random() * anecdotes.length))
  const handleButton = () => (setSelected(getRandomInt()))

  const handleVote = () => {
    const votes = [...points]
    votes[selected]++
    setPoints(votes)
  }
 
  const most = points.reduce((a,b)=> (a > b ? a : b))
  const voted = points.indexOf(most)

  return (
    <div>
      <h1>anecdote of the day</h1>
        {anecdotes[selected]}
        <br></br>
        has {points[selected]} votes
        <br></br>
        <span>
        <Button handleClick={ handleVote} text='vote' />
        <Button handleClick={handleButton} text='next anedote' />
        </span>
        <h1>anecdotes with most votes is</h1>
        {anecdotes[voted]}
        <br></br>
        has {most} votes
    </div>

  )
}

export default App