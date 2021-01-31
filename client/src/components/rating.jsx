import React from 'react';
import { BlueText } from '../style.js';

const Rating = (props) => (
  <div>
    <BlueText>
      {props.numOfRating} ratings
    </BlueText>
  </div>
);

export default Rating;