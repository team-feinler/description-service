import React from 'react';
import { TitleText, BlueText } from '../style.js';

const ItemHeading = (props) => (
  <div>
    <TitleText>
      {props.heading}
    </TitleText>
    <div>
      <BlueText>
        <u>Brand: Amazon</u>
      </BlueText>
    </div>
  </div>
);

export default ItemHeading;