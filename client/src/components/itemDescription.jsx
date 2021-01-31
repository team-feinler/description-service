import React from 'react';
import DescriptionPoint from './descriptionPoint.jsx';

const ItemDescription = (props) => (
  //map each description point to DescriptionPoint
  <div>
    {props.description.map(description => <DescriptionPoint description={description} />)}
  </div>
);

export default ItemDescription;

