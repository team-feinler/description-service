import React from 'react';
import { TitleText, BlueText } from '../style.js';

const ItemHeading = (props) => (
  <div>
    <TitleText>
      {props.heading}
    </TitleText>
    <div>
      <BlueText>
        Brand: Amazon
      </BlueText>
    </div>
  </div>
);

export default ItemHeading;