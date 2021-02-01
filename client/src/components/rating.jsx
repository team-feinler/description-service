import React from 'react';
import { BlueText, ClimatePledgeFriendlyText, RatingText } from '../style.js';

const Rating = (props) => (
  //need to change rating num to include comma
  <div>
    <RatingText> 12347 ratings </RatingText>
    <ClimatePledgeFriendlyText>Climate Pledge Friendly</ClimatePledgeFriendlyText>
    <BlueText>Audio Speakers</BlueText>
  </div>
);

export default Rating;