import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good+neutral+bad
  const avg = (all !== 0) ? (good-bad)/all : 0
  const positive = (all !== 0) ? good/all : 0;

  return (
    <div>
      <p>good {good} <br />
      neutral {neutral} <br />
      bad {bad} <br />
      all {all} <br />
      average {avg} <br />
      positive {positive*100}%
      </p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const changeGood = () => setGood(good => good+1)
  const changeNeutral = () => setNeutral(neutral => neutral+1)
  const changeBad = () => setBad(bad => bad+1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={changeGood} text='good' />
      <Button onClick={changeNeutral} text='neutral' />
      <Button onClick={changeBad} text='bad' />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App