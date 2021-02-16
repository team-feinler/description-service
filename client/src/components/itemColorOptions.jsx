import React, { useState } from 'react';
import { SectionDescriptionText } from '../style.js';
import { ColorBoxBlack, ColorBoxGray, ColorBoxWhite } from '../style.js';


const ItemColorOptions = (props) => {

  const [color, setColor] = useState(props.color);

  return (
    <div>
      <SectionDescriptionText>Color:</SectionDescriptionText> <b>{color}</b>
      <br></br>
      <ColorBoxBlack onClick={() => props.handleColorBoxClick(props.similarItems[0])} onMouseEnter={() => setColor('Black')} onMouseLeave={() => setColor(props.color)}></ColorBoxBlack>
      <ColorBoxWhite onClick={() => props.handleColorBoxClick(props.similarItems[1])} onMouseEnter={() => setColor('White')} onMouseLeave={() => setColor(props.color)}></ColorBoxWhite>
      <ColorBoxGray onClick={() => props.handleColorBoxClick(props.similarItems[2])} onMouseEnter={() => setColor('Gray')} onMouseLeave={() => setColor(props.color)}></ColorBoxGray>
    </div>

  );
};



//need to handle hover over color box'
//triggers the currentColor to change

//need to hanlde click on color box
//triggers the whole state of the app to change a new item
//returns a productId
//pass this object up to the top container (app)


export default ItemColorOptions;