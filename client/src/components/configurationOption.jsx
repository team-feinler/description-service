import React from 'react';
import { ConfigBox } from '../style.js';

const ConfigurationOption = (props) => (
  <ConfigBox>
    {props.configOption}
  </ConfigBox>
);

export default ConfigurationOption;