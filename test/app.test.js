import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import App from '../client/src/components/app.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
//import components

//test whether each component renders
describe('Components Should Render', () => {
  test('App component should render correctly onto the page', () => {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});