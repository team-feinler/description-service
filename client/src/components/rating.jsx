import React from 'react';
import { BlueText, ClimatePledgeFriendlyText } from '../style.js';

const Rating = (props) => (
  <div>
    <BlueText> 12347 ratings </BlueText> <b>|</b>
    <ClimatePledgeFriendlyText>Climate Pledge Friendly</ClimatePledgeFriendlyText>
    <BlueText>Audio Speakers</BlueText>
  </div>
);

export default Rating;