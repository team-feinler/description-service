import Rating from './rating.jsx';
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Chart, Bar, StarBox, Star5, Star4, Star3, Star2, Star1, BlueTxt} from '../style.js';


class StarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      star5: null,
      star4: null,
      star3: null,
      star2: null,
      star1: null
    };
    this.getStarRatings = this.getStarRatings.bind(this);
  }

  componentDidMount () {
    this.getStarRatings(this.props.productId);
  }

  getStarRatings (id) {
    let productId = id;
    axios.get(`http://ec2-174-129-73-213.compute-1.amazonaws.com:4006/Reviews/getReviewSummary/${productId}`)
      .then((response) => {
        let starFive = parseInt(response.data.fiveStar.slice(0, response.data.fiveStar.length - 1));
        let starFour = parseInt(response.data.fourStar.slice(0, response.data.fourStar.length - 1));
        let starThree = parseInt(response.data.threeStar.slice(0, response.data.threeStar.length - 1));
        let starTwo = parseInt(response.data.twoStar.slice(0, response.data.twoStar.length - 1));
        let starOne = parseInt(response.data.oneStar.slice(0, response.data.oneStar.length - 1));
        this.setState({
          star5: starFive,
          star4: starFour,
          star3: starThree,
          star2: starTwo,
          star1: starOne
        })
          .catch(err => {
            console.log(err);
          });
      });
  }


  render() {

    return (
      <div>
        <Chart>
          <Bar>
            <BlueTxt>5 star</BlueTxt>
            <Star5></Star5>
            <BlueTxt>{this.state.star5}%</BlueTxt>
          </Bar>
          <Bar>
            <BlueTxt>4 star</BlueTxt>
            <Star4></Star4>
            <BlueTxt>{this.state.star4}%</BlueTxt>
          </Bar>
          <Bar>
            <BlueTxt>3 star</BlueTxt>
            <Star3></Star3>
            <BlueTxt>{this.state.star3}%</BlueTxt>
          </Bar>
          <Bar>
            <BlueTxt>2 star</BlueTxt>
            <Star2></Star2>
            <BlueTxt>{this.state.star2}%</BlueTxt>
          </Bar>
          <Bar>
            <BlueTxt>1 star</BlueTxt>
            <Star1></Star1>
            <BlueTxt>{this.state.star1}%</BlueTxt>
          </Bar>
        </Chart>
        <br></br>
        <BlueTxt>See all customer reviews ></BlueTxt>
      </div>
    );
  }
}

export default StarChart;