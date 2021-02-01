import React from 'react';
import ConfigurationOption from './configurationOption.jsx';
import { SectionDescriptionText, FirstConfigBox } from '../style.js';

const ItemConfiguration = (props) => (
  //map to configuration option
  <div>
    <SectionDescriptionText>Configuration:</SectionDescriptionText> <b>{props.configuration[0]}</b>
    <div>
      <FirstConfigBox>{props.configuration[0]}</FirstConfigBox>
      {props.configuration.slice(1).map(config => <ConfigurationOption configOption={config} />
      )}
    </div>
  </div>
);

export default ItemConfiguration;