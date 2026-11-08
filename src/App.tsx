import { useState } from "react";

function App() { 
  const [city, setCity] = useState("")

  function setCityAsOsaka() {
    setCity("Osaka")
  }

  function setCityAsTokyo() {
    setCity("Tokyo")
  }

  const [guest, setGuest] = useState(1)

  function handleClick() {
    alert("Let's find you a room!")
  }

  function addOneGuest() {
    setGuest(guest + 1)
  }

  function minusOneGuest() {
    setGuest(Math.max(guest - 1, 1))
  }
  
  return (
    <main>
      <h1>Hotel Booking</h1>
      <p>Find a room for your trip in {city}</p>
      <button onClick = {setCityAsOsaka}>Osaka</button>
      <button onClick = {setCityAsTokyo}>Tokyo</button>
      <input value = {city} onChange = {(e) => setCity(e.target.value)}></input>
      <button onClick = {handleClick}>Find Room</button>
      <p>guest : {guest}</p>
      <button onClick = {addOneGuest}>+</button>
      <button onClick = {minusOneGuest}  disabled = {guest === 1}>-</button>
    </main>
  )
}

export default App

