import React from 'react';
import { DesPoint } from '../style.js';

const DescriptionPoint = (props) => (
  <li>
    <DesPoint>
      {props.description}
    </DesPoint>
  </li>
);

export default DescriptionPoint;