import React from 'react';
import DescriptionPoint from './descriptionPoint.jsx';
import { Des } from '../style.js';

const ItemDescription = (props) => (
  //map each description point to DescriptionPoint
  < Des>
    {props.description.map(description => <DescriptionPoint description={description} />)}
  </Des>
);

export default ItemDescription;

