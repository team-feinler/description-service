import React from 'react';
import ColorOption from './colorOption.jsx';

const ItemColorOptions = (props) => (
  //map color options to colorOption component
  //format 3 squares 
  <div>
    Color: {props.color}
    <br></br>
    BLACK WHITE GRAY
    <div>
      {props.similarItems.map(item => <ColorOption item={item} />
      )}
    </div>
  </div>
);

export default ItemColorOptions;