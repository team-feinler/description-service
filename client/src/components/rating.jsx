import React, { useState } from 'react';
import { BlueText, ClimatePledgeFriendlyText, RatingText, Image, RatingBox} from '../style.js';
import StarRatings from 'react-star-rating-component';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import StarChart from './ratingChart.jsx';

const Rating = (props) => {

  let numOfStars = props.starRating;

  return (
    <div>
      <RatingBox>
        <div>
          <span data-tip data-for='starChart'><StarRatings
            starCount={5}
            value={numOfStars}
            starColor="#FFA500"
          >
          </StarRatings></span>
          <ReactTooltip id="starChart" place="bottom" effect="solid" multiline={true} backgroundColor="white" textColor='black' border={true} borderColor='black'>
            <div>
              <StarRatings
                starCount={5}
                value={numOfStars}
                starColor="#FFA500"
              >
              </StarRatings>
              {props.starRating} out of 5
              <br></br>
              {props.numOfRating} global rating
            </div>
            <StarChart productId={props.productId}></StarChart>
          </ReactTooltip>
        </div>

        <RatingText> {props.numOfRating} ratings </RatingText>
      </RatingBox>
      <ClimatePledgeFriendlyText>
        <img style={{height: '22px', width: '22px'}} src="https://freedesignfile.com/upload/2016/06/Globe-with-tree-logos-vector-design-02.jpg"></img>
          Climate Pledge Friendly</ClimatePledgeFriendlyText>
      <BlueText>Audio Speakers</BlueText>
    </div>
  );

};

export default Rating;