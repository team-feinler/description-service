import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
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
    axios.post('/description/multiple', {productIds: [1001, 1002]})
      .then((res) => {
        console.log(res.data);
      });
  }

  render () {
    return (
      <h1>HELLO SERVICE IS RUNNING!</h1>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));