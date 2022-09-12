import React, { useState } from 'react'
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [state, setState] = useState({
    message: initialMessage,
    email: initialEmail,
    index: initialIndex,
    steps: initialSteps
  })

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    if(state.index === 0){
      let x = 1;
      let y = 1;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }else if(state.index === 1){
      let x = 2;
      let y = 1;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }else if(state.index === 2){
      let x = 3;
      let y = 1;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }else if(state.index === 3){
      let x = 1;
      let y = 2;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }else if(state.index === 4){
      let x = 2;
      let y = 2;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }else if(state.index === 5){
      let x = 3;
      let y = 2;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }else if(state.index === 6){
      let x = 1;
      let y = 3;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }else if(state.index === 7){
      let x = 2;
      let y = 3;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }else if(state.index === 8){
      let x = 3;
      let y = 3;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates ${getXY()}`;
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setState({...state, message: initialMessage, email: initialEmail, index: 4, steps: 0});
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    if(evt.target.id === 'left' && state.index !== 0 && state.index !== 3 && state.index !== 6){
      return setState({...state, index: state.index-1, steps: state.steps+1});
    }else if(evt.target.id === 'right' && state.index !== 2 && state.index !== 5 && state.index !== 8){
      return setState({...state, index: state.index+1, steps: state.steps+1});
    }else if(evt.target.id === 'up' && state.index !== 0 && state.index !== 1 && state.index !== 2){
      return setState({...state, index: state.index-3, steps: state.steps+1});
    }else if(evt.target.id === 'down' && state.index !== 6 && state.index !== 7 && state.index !== 8){
      return setState({...state, index: state.index+3, steps: state.steps+1});
    }else{
      return setState({...state, message: `You can\'t go ${evt.target.id}`})
    }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    evt.preventDefault();
    setState({...state, email: evt.target.value});
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    let coordinates = getXY();
    let x = coordinates[1];
    let y = coordinates[4];
    
    axios.post('http://localhost:9000/api/result', {
      x: x,
      y: y,
      steps: state.steps,
      email: state.email
    })
    .then(res => {
      setState({...state, message: res.data.message, email: ''});
    })
    .catch(err => {
      setState({...state, message: err.response.data.message})
    })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {state.steps} {state.steps === 1 ? <span>time</span> : <span>times</span>}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === state.index ? ' active' : ''}`}>
              {idx === state.index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange} value={state.email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
