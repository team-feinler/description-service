import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px #ccc solid;
  width: 500px;
 `;

const DesPoint = styled.li`
  display: flex;
  font-size: 14px;
  line-height: 20px;
  list-style-type: disc;
  font-family: Arial, sans-serif;
  `;

const Des = styled.ul`
  list-style-type: disc;
  margin: 5px;
`;

const TitleText = styled.h1`
  font-size: 24px;
  line-height: 32px;
  font-weight: 400;
  font-family: Arial, sans-serif;
  color: black;
  margin: 1px;
`;

const BlueText = styled.h6`
  color: #007185;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
  &:hover {
    color: #C7511F;
  }
  margin: 1px;
`;

const SectionDescriptionText = styled.h1`
  color: #888;
  font-weight: 400;
  padding-left: 2px;
  padding-bottom: 2px;
  line-height: 1.3em;
  font-size: 14px;
  font-family: Arial, sans-serif;
  display: inline;
`;

const ConfigBox = styled.button`
  margin-left: 8px;
  margin-right: 8px;
  line-height: 20px;
  padding: 5px 10px 5px 10px;
  text-align: left;
  white-space: normal;
  color: #111;
  font: 400 14px Arial;
  background-color: white;
  border: 1px solid #cccccc;
  margin-bottom: 8px;
  margin-top 8px;
  &:hover {
    background-color: #cccccc;
    border-color: #b3b3b3;
  }
`;

const ColorBox = styled.button`
  display: inline;
  border: 1px solid #cccccc;
  height: 40px;
  width: 40px;
  margin-left: 7px;
  margin-right: 7px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: white;
`;

const HeadingBox = styled.div`
  flex: 1;
  margin: 1px;
`;

const RatingAndAnswersBox = styled.div`
  flex: 2;
  margin: 1px;
  display: flex;
  flex-direction: row;
`;

const RatingBox = styled.div`
  flex: 1;
  order: 1;
`;

const AnswersBox = styled.div`
  flex: 1;
  order:2;
`;

const PriceBox = styled.div`
  flex: 2;
  margin: 1px;
`;

const ColorOptionBox = styled.div`
  flex: 1;
`;

const ConfigOptionBox = styled.div`
  flex: 1;
`;

const DescriptionBox = styled.div`
  flex: 3;
`;

const Star = styled.div`
position: relative;

display: inline-block;
width: 0;
height: 0;

margin-left: .9em;
margin-right: .9em;
margin-bottom: 1.2em;

border-right:  .3em solid transparent;
border-bottom: .7em  solid #FC0;
border-left:   .3em solid transparent;

font-size: 8px;

&:before, &:after {
  content: '';

  display: block;
  width: 0;
  height: 0;

  position: absolute;
  top: .6em;
  left: -1em;

  border-right:  1em solid transparent;
  border-bottom: .7em  solid #FC0;
  border-left:   1em solid transparent;

  transform: rotate(-35deg);
}

&:after {
  transform: rotate(35deg);
}
`;

const PriceText = styled.h6`
  color: #565959;
  font-size: 14px;
  line-height: 20px;
  font-weight: 200;
  margin: 5px;
  display: inline;
`;


export {
  Wrapper,
  DesPoint,
  Des,
  DescriptionContainer,
  TitleText,
  BlueText,
  SectionDescriptionText,
  ConfigBox,
  ColorBox,
  Star,
  PriceText,
  HeadingBox,
  RatingAndAnswersBox,
  PriceBox,
  ColorOptionBox,
  ConfigOptionBox,
  DescriptionBox,
  RatingBox,
  AnswersBox
};