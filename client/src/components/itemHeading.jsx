import React from 'react';
import { TitleText, BlueText } from '../style.js';

const ItemHeading = (props) => (
  <div>
    <TitleText>
      {props.heading} | {props.color}
    </TitleText>
    <BlueText>
      <u>Brand: {props.brand}</u>
    </BlueText>
  </div>
);

export default ItemHeading;