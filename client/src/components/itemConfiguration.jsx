import React from 'react';
import ConfigurationOption from './configurationOption.jsx';
import { SectionDescriptionText } from '../style.js';

const ItemConfiguration = (props) => (
  //map to configuration option
  <div>
    <SectionDescriptionText>Configuration:</SectionDescriptionText> <b>{props.configuration[0]}</b>
    <div>
      {props.configuration.map(config => <ConfigurationOption configOption={config} />
      )}
    </div>
  </div>
);

export default ItemConfiguration;