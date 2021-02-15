import React from 'react';
import { BlueText } from '../style.js';

const AnsweredQuestions = (props) => (
  <div>
    <BlueText>
     | {props.numOfAnswers} answered questions
    </BlueText>
  </div>
);

export default AnsweredQuestions;