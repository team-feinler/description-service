import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
export default App;