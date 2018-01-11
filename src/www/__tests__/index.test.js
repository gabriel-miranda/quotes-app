/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Index from '../pages/index';

import page1 from './__mocks__/page1.mock';
import page2 from './__mocks__/page2.mock';

const testError = new Error('Test error');

describe('Index test with enzyme', () => {
  it('should load the quotes properly in the state', async () => {
    const index = shallow(<Index data={page1} error={null} />);
    expect(index.state().data.results.length).toBeGreaterThan(0);
  });

  it('should set fetching state when called', async () => {
    const index = shallow(<Index data={page1} error={null} />);
    index.instance().setFetching();
    expect(index.update().state().fetching).toEqual(true);
  });

  it('should load the new quotes in the state', async () => {
    const index = shallow(<Index data={page1} error={null} />);
    index.instance().addNewPage(page2);
    expect(index.update().state().data.results.length).toBeGreaterThan(10);
  });

  it('should load the next page in the state', async () => {
    const index = shallow(<Index data={page1} error={null} />);
    index.instance().addNewPage(page2);
    expect(index.update().state().data.pagination.page).toEqual(2);
  });

  it('should load error in state if an error happend', async () => {
    const index = shallow(<Index data={page1} error={testError} />);
    expect(index.update().state().error).toEqual(testError);
  });
});

describe('Index test with Snapshot Testing', () => {
  it('should show Index', () => {
    const component = renderer.create(<Index data={page1} error={null} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
