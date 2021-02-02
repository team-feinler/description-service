import React from 'react';
import { BlueText, ClimatePledgeFriendlyText, RatingText, Image } from '../style.js';

const Rating = (props) => (
  //need to change rating num to include comma
  <div>
    <RatingText> 12347 ratings </RatingText>
    <ClimatePledgeFriendlyText>
      <img style={{height: '22px', width: '22px'}} src="https://freedesignfile.com/upload/2016/06/Globe-with-tree-logos-vector-design-02.jpg"></img>
      Climate Pledge Friendly</ClimatePledgeFriendlyText>
    <BlueText>Audio Speakers</BlueText>
  </div>
);

export default Rating;