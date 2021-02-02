import React from 'react';
import { BlueText, ClimatePledgeFriendlyText, RatingText, Image, RatingBox } from '../style.js';
import StarRatings from 'react-star-ratings';

const Rating = (props) => (
  //need to change rating num to include comma
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

export default Rating;