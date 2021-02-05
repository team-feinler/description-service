import React from 'react';
import { BlueText, ClimatePledgeFriendlyText, RatingText, Image, RatingBox} from '../style.js';
import StarRatings from 'react-star-ratings';
import styled from 'styled-components';
import {Tooltip} from 'react-tippy';









class Rating extends React.Component {
  //need to change rating num to include comma
  constructor(props) {
    super(props);
    this.toggleStarsChart = this.toggleStarsChart.bind(this);
    this.handleHoverOverStars = this.handleHoverOverStars.bind(this);
    this.state = {
      toggleStarsChart: false,
      popoverOpen: false
    };
  }



  toggleStarsChart () {
    //if state is false don't show
    this.setState({
      toggleStarsChart: !this.state.toggleStarsChart,
      popoverOpen: !this.state.popoverOpen
    });
    //if state is true show chart
  }

  handleHoverOverStars () {

  }


  render () {
    return (
      <div>
        <RatingBox>
          <StarRatings
            rating = {5}
            numberOfStars={5}
            starRatedColor="orange"
            starDimension="15px"
            starSpacing="1px"
            starEmptyColor="white"
          ></StarRatings>

          <RatingText> 12347 ratings </RatingText>
        </RatingBox>
        <ClimatePledgeFriendlyText>
          <img style={{height: '22px', width: '22px'}} src="https://freedesignfile.com/upload/2016/06/Globe-with-tree-logos-vector-design-02.jpg"></img>
          Climate Pledge Friendly</ClimatePledgeFriendlyText>
        <BlueText>Audio Speakers</BlueText>
      </div>
    );
  }

}

export default Rating;