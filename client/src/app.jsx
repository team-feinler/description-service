import React from 'react';
import ReactDOM from 'react-dom';
import exampleData from './exampleData.js';

class App extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      items: exampleData
    }
  }

  render () {
    return (
      // <h1></h1>
      <p>{this.state.items}</p>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));