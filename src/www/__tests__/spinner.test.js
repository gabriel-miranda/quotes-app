/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Spinner from '../components/Spinner';

describe('Spinner test with enzyme', () => {
  it('should show a large spinner if no size prop is set', () => {
    const spinner = shallow(<Spinner />);
    expect(spinner.find('.spinner-lg').length).toEqual(1);
  });

  it('should show an auth0 spinner if no auth0 prop is set', () => {
    const spinner = shallow(<Spinner />);
    expect(spinner.find('.is-auth0').length).toEqual(1);
  });

  it('should show a simple (no auth0) spinner if auth0 prop is set to false', () => {
    const spinner = shallow(<Spinner auth0={false} />);
    expect(spinner.find('.is-auth0').length).toEqual(0);
  });

  it('should show a small spinner if small prop is set', () => {
    const spinner = shallow(<Spinner size="sm" />);
    expect(spinner.find('.spinner-sm').length).toEqual(1);
  });
});

describe('Spinner test with Snapshot Testing', () => {
  it('should show Card correctly', () => {
    const component = renderer.create(<Spinner />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
