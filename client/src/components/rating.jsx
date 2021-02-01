import React from 'react';
import { BlueText } from '../style.js';
import { Star } from '../style.js';

const Rating = (props) => (
  <div>
    <Star></Star>
    <Star></Star>
    <Star></Star>
    <Star></Star>
    <Star></Star>
    <BlueText>
      {props.numOfRating} ratings
    </BlueText>
  </div>
);

export default Rating;