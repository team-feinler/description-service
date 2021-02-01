import React from 'react';
import ColorOption from './colorOption.jsx';
import { SectionDescriptionText } from '../style.js';
import { ColorBoxBlack, ColorBoxGray, ColorBoxWhite } from '../style.js';


const ItemColorOptions = (props) => (
  //map color options to colorOption component
  //format 3 squares
  <div>
    <SectionDescriptionText>Color:</SectionDescriptionText> <b>{props.color}</b>
    <br></br>
    <ColorBoxBlack></ColorBoxBlack>
    <ColorBoxWhite></ColorBoxWhite>
    <ColorBoxGray></ColorBoxGray>
    <div>
      {props.similarItems.map(item => <ColorOption item={item} />
      )}
    </div>
  </div>
);

export default ItemColorOptions;