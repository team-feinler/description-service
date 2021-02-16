import React from 'react';
import Chart from 'chart.js';

const data = {
  data: {
    datasets: [
      {
        backgroundColor: ["#DE7921", "#DE7921", "#DE7921", "#DE7921", "#DE7921"],
        data: [45, 20, 15, 10, 6],
        label: null
      }
    ]
  },
  scales: {
    xAxes: [{
      display: false,
      gridLines: {
        display: false
      },
      scaleLabel: {
        display: true,
        labelString: ''
      },
      ticks: {
        steps: 5,
        stepStize: 10,
        max: 100,
        min: 0
      },
      stacked: true
    }],
    yAxes: [
      {
        barPercentage: 0.5,
        display: true,
        position: 'left',
        labels: ["5 star", '4 star', '3 star', '2 star', '1 star'],
        stacked: true,
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ]
  }

};

export default data;