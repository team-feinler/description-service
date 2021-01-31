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
  line-height: 14px
  padding: 1px;
  font-family: Arial, sans-serif;
  margin: 5px;
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
  line-height: 20px
`;

export {
  Wrapper,
  DesPoint,
  Des,
  DescriptionContainer,
  TitleText,
  BlueText
};