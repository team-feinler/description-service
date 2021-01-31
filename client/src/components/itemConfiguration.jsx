import React from 'react';
import ConfigurationOption from './configurationOption.jsx';

const ItemConfiguration = (props) => (
  //map to configuration option
  <div>
    Item Configuration
    <div>
      {props.configuration.map(config => <ConfigurationOption configOption={config} />
      )}
    </div>
  </div>
);

export default ItemConfiguration;