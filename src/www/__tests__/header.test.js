/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../components/Header';

describe('Header test with enzyme', () => {
  it('should show header title correctly"', () => {
    const header = shallow(<Header />);

    expect(header.find('h1').text()).toEqual('Quotes app');
  });
});

describe('Header test with Snapshot Testing', () => {
  it('should show header title correctly', () => {
    const component = renderer.create(<Header />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
