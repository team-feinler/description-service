import React from 'react';
import ColorOption from './ColorOption.jsx';

const ItemColorOptions = (props) => (
  //map color options to colorOption component
  <div>{props.colors}</div>
);

export default ItemColorOptions;