import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  if(text === 'positive') value += '%'

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good+neutral+bad
  const avg = (all !== 0) ? (good-bad)/all : 0
  const positive = (all !== 0) ? good/all : 0;

  if(all !== 0){
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={all} />
            <StatisticLine text='average' value={avg} />
            <StatisticLine text='positive' value={positive*100} />
          </tbody>
        </table>
      </div>
    )
  }
  else{
    return <p>No feedback given</p>
  }
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