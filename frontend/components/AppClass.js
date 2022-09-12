import React from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = {
      message: '',
      email: '',
      index: 4,
      steps: 0
    }
  }

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    if(this.state.index === 0){
      let x = 1;
      let y = 1;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }else if(this.state.index === 1){
      let x = 1;
      let y = 2;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }else if(this.state.index === 2){
      let x = 1;
      let y = 3;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }else if(this.state.index === 3){
      let x = 2;
      let y = 1;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }else if(this.state.index === 4){
      let x = 2;
      let y = 2;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }else if(this.state.index === 5){
      let x = 2;
      let y = 3;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }else if(this.state.index === 6){
      let x = 3;
      let y = 1;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }else if(this.state.index === 7){
      let x = 3;
      let y = 2;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }else if(this.state.index === 8){
      let x = 3;
      let y = 3;
      let coordinates = `(${x}, ${y})`;
      return coordinates;
    }
    
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates ${this.getXY()}`;

  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({...this.state, message: '', email: '', index: 4, steps: 0});
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    if(evt.target.id === 'left' && this.state.index !== 0 && this.state.index !== 3 && this.state.index !== 6){
      return this.setState({...this.state, index: this.state.index-1, steps: this.state.steps+1});
    }else if(evt.target.id === 'right' && this.state.index !== 2 && this.state.index !== 5 && this.state.index !== 8){
      return this.setState({...this.state, index: this.state.index+1, steps: this.state.steps+1});
    }else if(evt.target.id === 'up' && this.state.index !== 0 && this.state.index !== 1 && this.state.index !== 2){
      return this.setState({...this.state, index: this.state.index-3, steps: this.state.steps+1});
    }else if(evt.target.id === 'down' && this.state.index !== 6 && this.state.index !== 7 && this.state.index !== 8){
      return this.setState({...this.state, index: this.state.index+3, steps: this.state.steps+1});
    }else{
      return this.setState({...this.state, message: `You can\'t go ${evt.target.id}`})
    }

  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    evt.preventDefault();
    this.setState({...this.state, email: evt.target.value});
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    let coordinates = this.getXY();
    let x = coordinates[1];
    let y = coordinates[4]
    axios.post('http://localhost:9000/api/result', {
      x: x,
      y: y,
      steps: this.state.steps,
      email: this.state.email
    })
    .then(res => {
      this.setState({...this.state, message: res.data.message, email: '', index: 4, steps: 0});
    })
    .catch(err => {
      this.setState({...this.state, message: err.response.data.message})
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
