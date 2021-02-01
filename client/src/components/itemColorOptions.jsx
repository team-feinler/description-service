import React from 'react';
import ColorOption from './colorOption.jsx';
import { SectionDescriptionText } from '../style.js';

const ItemColorOptions = (props) => (
  //map color options to colorOption component
  //format 3 squares
  <div>
    <SectionDescriptionText>Color:</SectionDescriptionText> {props.color}
    <br></br>
    BLACK WHITE GRAY
    <div>
      {props.similarItems.map(item => <ColorOption item={item} />
      )}
    </div>
  </div>
);

export default ItemColorOptions;