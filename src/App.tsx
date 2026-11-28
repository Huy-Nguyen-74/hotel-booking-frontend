import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function App() { 
  const [city, setCity] = useState("");

  function setCityAsOsaka() {
    setCity("Osaka");
    setErrors(prev => ({...prev, city: ""})); // Whenever city isn't blank during search, error won't show up
  }

  function setCityAsTokyo() {
    setCity("Tokyo");
    setErrors(prev => ({...prev, city: ""})); // Whenever city isn't blank during search, error won't show up
  }

  const [guest, setGuest] = useState(1);

  function addOneGuest() {
    setGuest(guest + 1);
  }

  function minusOneGuest() {
    setGuest(Math.max(guest - 1, 1)); // guestCount cannot be smaller than one
  }

  const [errors, setErrors] = useState({
    city: "",
    dates: ""
  });

  async function handleClick() {
    if (city.trim() === "") {
      setErrors(prev => ({...prev, city: "Select destination for your booking"}));
    }

    if (city.trim() !== "") {
      setErrors(prev => ({...prev, city: ""}));
    }

    if (checkInDate >= checkOutDate) {
      setErrors(prev => ({...prev, dates: "checkInDate must be before checkOutDate"}));
    }
    
    if (checkInDate < checkOutDate) {
      setErrors(prev => ({...prev, dates: ""}))
    }

    if ((city.trim() !== "") && (checkInDate < checkOutDate) && (guest)) {
      const queryParams = new URLSearchParams({
        city: city,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        guestCount: String(guest)
      })

      const response = await fetch(`${API_URL}/available-rooms?${queryParams}`)

      const data = await response.json();
      console.log(data);

      return data;
    }
  }

  const [checkInDate, setCheckInDate] =  useState(new Date().toISOString().split("T")[0]); // Initialize with today's date
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 86400000).toISOString().split("T")[0]); // Initialize with the next date (tomorrow).
  
  /*
  Rule: checkInDate < checkOutDate

  For the first demo app, we will implement only simple features.

  Below is a more complex version - similar to Booking.com - to be done some time later:

  -----------------------------
  By default, both dates have been selected. checkInDate is today while checkOutDate is tomorrow. 

  Next, divide into the following situations (following Booking.com model)
    -If only checkInDate has been selected, on the next click:
      +If the user chooses checkOutDate earlier than checkInDate, the checkInDate becomes the selected checkOutDate, while the original checkInDate disappears.
      +If the user chooses checkOutDate later than checkInDate, then everything proceeds as normal.
      +If the user chooses the same checkOutDate as checkInDate, nothing will change. They have to select a different date to realize any change.
    
    -If both dates have been selected: all data are cleared up. Only the new checkInDate is registered.
  -----------------------------
  */

  return (
    <main>
      <h1>Hotel Booking</h1>
      <p>Find a room for your trip in {city}</p>
      <button onClick = {setCityAsOsaka}>Osaka</button>
      <button onClick = {setCityAsTokyo}>Tokyo</button>
      <input value = {city} onChange = {(e) => {setCity(e.target.value); if ((e.target.value).trim() != "") {setErrors(prev => ({...prev, city: ""}))}}}></input>
      <input type = "date" value = {checkInDate} onChange = {(e) => {setCheckInDate(e.target.value)}}></input>
      <input type = "date" value = {checkOutDate} onChange = {(e) => {setCheckOutDate(e.target.value)}}></input>
      <button onClick = {handleClick}>Find Room</button>
      <p>{errors.city}</p>
      <p>{errors.dates}</p>
      <p>guest : {guest}</p>
      <button onClick = {addOneGuest}>+</button>
      <button onClick = {minusOneGuest}  disabled = {guest === 1}>-</button>
    </main>
  );
}

export default App;

