/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../components/Header';

const dummyFn = () => {};

describe('Header test with enzyme', () => {
  it('should show header title correctly on small and up devices"', () => {
    const header = shallow(<Header handleSearch={dummyFn} />);
    expect(header.find('h1').find('.hidden-xs').text()).toEqual('Quotes app');
  });

  it('should show header title correctly on extra small devices"', () => {
    const header = shallow(<Header handleSearch={dummyFn} />);
    expect(header.find('h1').find('.hidden-sm').text()).toEqual('QA');
  });
});

describe('Header test with Snapshot Testing', () => {
  it('should show header title correctly', () => {
    const component = renderer.create(<Header handleSearch={dummyFn} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
