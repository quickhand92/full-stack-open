import { useState } from 'react'


const NextButton = ({ nextClick }) => <button onClick={nextClick}>next anecdote</button>

const VoteButton = ({ voteClick }) => <button onClick={voteClick}>vote</button>

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
  const [vote, setVote] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 })
  const [highest, setHighest] = useState(0)

  const nextClick = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length)))
  }

  const voteClick = () => {
    const copy = { ...vote }
    copy[selected]++
    setVote(copy)
    let highest = 0
    let position = 0
    for (let i = 0; i < anecdotes.length; i++) {
      if (copy[i] > highest) {
        highest = copy[i]
        position = i
      }
    }
    setHighest(position)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {vote[selected]} votes</div>
      <VoteButton voteClick={voteClick} />
      <NextButton nextClick={nextClick} />
      <div>
        <h1>Anecdote with the most votes</h1>
        {anecdotes[highest]}
        <div>has {vote[highest]} votes</div>
      </div>
    </div>
  )
}

export default App