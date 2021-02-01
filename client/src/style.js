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
`;

const BlueText = styled.h6`
  color: #007185;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
  &:hover {
    color: #C7511F;
  }
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
  display: flex;
  flex-direction: column;
  line-height: 20px;
  padding: 5px 10px 5px 10px;
  text-align: left;
  white-space: normal;
  color: #111;
  font: 400 14px Arial;
  background-color: white;
  border: 1px solid #cccccc;
  position: relative;
  margin-bottom: 8px;
  margin-top 8px;
  &:hover {
    background-color: #cccccc;
    border-color: #b3b3b3;
  }
`;


export {
  Wrapper,
  DesPoint,
  Des,
  DescriptionContainer,
  TitleText,
  BlueText,
  SectionDescriptionText,
  ConfigBox
};