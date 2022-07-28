import { useEffect, useState } from 'react'
import { Die } from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import './styles/styles.css'

function App() {
  const [dices,setDices] = useState(allNewDice)
  const [tenzies,setTenzies] = useState(false)

  useEffect(()=>{
    const firstValue = dices[0].value
    const allHeld =  dices.every(die => die.isHeld) 
    const allSameValue = dices.every(die => die.value === firstValue) 
    if(allHeld && allSameValue){
      setTenzies(true)
    }
  },[dices])

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDice(){
    const newDices = []
    for(let i = 0; i < 10; i++){
      newDices.push(generateNewDie())
    }
    return newDices
  }

  function rollDice(){
    if(!tenzies){
      setDices(oldDice => oldDice.map(dice => {
        return dice.isHeld ? dice : generateNewDie()
      }))
    }else{
      setDices(allNewDice) 
      setTenzies(false)
    }
  }

  function holdDice(id){
    setDices(oldDice => oldDice.map(dice=>{
      return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
    }))
  }

  return (
    <div className="App">
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dieContainer'>
          {dices.map(dice => (
            <Die 
            key={dice.id}
            id={dice.id}
            number={dice.value}
            isHeld={dice.isHeld}
            holdDice={holdDice}
            />
          ))}
        </div>
        <button onClick={rollDice}>{tenzies ? "New game" : "Roll"}</button>

        {tenzies && <Confetti>

        </Confetti>}
      </main>
    </div>
  )
}

export default App
