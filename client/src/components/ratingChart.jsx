import Rating from './rating.jsx';
import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import data from '../chartLayout.js';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ['5 star', '4 star', '3 star', '2 star', '1 star']
    };
  }

  render () {
    return (
      <div>
        <HorizontalBar data={data}></HorizontalBar>
      </div>
    );
  }
}


export default Chart;