import React from 'react';

const ColorOption = (props) => (
  //every item will have all three color options available (white, black, gray)
//these color options are squares with the color filled in and a link to the item with the same name but that squares color
//if one of the squares is clicked then the item should change
  <div>
    {props.testColor}
  </div>
);

export default ColorOption;