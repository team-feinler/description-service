import Rating from './rating.jsx';
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';


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
    this.getStarRatings(1000);
  }

  getStarRatings (id) {
    let productId = id;
    axios.get(`http://localhost:4006/Reviews/getReviewSummary/${productId}`)
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
        });
      });
  }


  render() {
    console.log(100 - this.state.star4);


    const Chart = styled.div`
      display: flex;
      flex-direction: column;
    `;

    const StarBox = styled.button`
      width: 180px;
      height: 20px;
      margin: 5px;
      line-height: 5px;
      border-radius: 5px;
    `;

    const Bar = styled.div`
    display: inline-block;
  `;

    const Star5 = styled(StarBox)`
      background: linear-gradient(90deg, orange 0% ${this.state.star5}%, #D3D3D3  ${this.state.star5}% 100%);
    `;

    const Star4 = styled(StarBox)`
      background: linear-gradient(90deg, orange 0% ${this.state.star4}%, #D3D3D3 ${this.state.star4}% 100%);
    `;
    const Star3 = styled(StarBox)`
      background: linear-gradient(90deg, orange 0% ${this.state.star3}%, #D3D3D3 ${this.state.star3}% 100%);
    `;

    const Star2 = styled(StarBox)`
      background: linear-gradient(90deg, orange 0% ${this.state.star2}%, #D3D3D3 ${this.state.star2}% 100%);
    `;
    const Star1 = styled(StarBox)`
      background: linear-gradient(90deg, orange 0% ${this.state.star1}%, #DCDCDC ${this.state.star1}% 100%);
    `;

    const BlueTxt = styled.h6`
      color: #007185;
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 16px;
        &:hover {
        color: #C7511F;
        cursor: pointer;
        }
       margin: 1px;
       display: inline-block;
    `;

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

      </div>
    );
  }
}

export default StarChart;