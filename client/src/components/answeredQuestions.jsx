import React from 'react';
import { BlueText, Link } from '../style.js';

const AnsweredQuestions = (props) => (
  <div>
    <Link href="CustomerQuestions">
      <BlueText>
     | {props.numOfAnswers} answered questions
      </BlueText>
    </Link>
  </div>
);

export default AnsweredQuestions;