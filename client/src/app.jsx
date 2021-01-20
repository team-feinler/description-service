import React from 'react';
import ReactDOM from 'react-dom';
// import data from './data.js';
// console.log(data);

class App extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      items: null
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