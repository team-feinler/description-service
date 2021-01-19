import React from 'react';
import ReactDOM from 'react-dom';
import exampleData from './data.js';
console.log(exampleData);

class App extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      items: exampleData
    };
  }

  componentDidMount() {

  }

  render () {
    return (
      <h1>HELLO SERVICE IS RUNNING!</h1>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));