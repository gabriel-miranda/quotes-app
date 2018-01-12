/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Index from '../pages/index';

import page1 from './__mocks__/page1.mock';
import page2 from './__mocks__/page2.mock';

import sorts from '../utils/sorts';

const testError = new Error('Test error');

describe('Index test with enzyme', () => {
  it('should load the quotes properly in the state', async () => {
    const index = shallow(<Index data={page1} error={null} />);
    expect(index.state().data.results.length).toBeGreaterThan(0);
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

  it('should change sort when calling handleChangeSort with a sortBy', async () => {
    const index = shallow(<Index data={page1} error={testError} />);
    const sortBy = Object.keys(sorts)[1];
    index.instance().handleChangeSort(sortBy);
    expect(index.update().state().sortBy).toEqual(sortBy);
  });

  it('should change searchQuery when calling handleSearch with parameters', async () => {
    const index = shallow(<Index data={page1} error={null} />);
    index.instance().handleSearch('text', 'miracle');
    expect(index.update().state().searchQuery).toMatchObject({field: 'text', text: 'miracle'});
  });

  it('should not change state when calling handleSearch without text', async () => {
    const index = shallow(<Index data={page1} error={null} />);
    const prevState = index.update().state();
    index.instance().handleSearch();
    expect(index.update().state()).toMatchObject(prevState);
  });

  it('should return empty query when calling buildQuery without setting query', async () => {
    const index = shallow(<Index data={page1} error={null} />);
    expect(index.instance().buildQuery()).toMatchObject({});
  });

  it('should reset sorting when making a search', async () => {
    const index = shallow(<Index data={page1} error={null} />);
    const sortBy = Object.keys(sorts)[1];
    index.instance().handleChangeSort(sortBy);
    index.instance().handleSearch('text', 'miracle');
    expect(index.update().state().sortBy).toEqual(Object.keys(sorts)[0]);
  });

  it('should empty the data when calling reset', async () => {
    const index = shallow(<Index data={page1} error={testError} />);
    const sortBy = Object.keys(sorts)[1];
    index.instance().reset(sortBy);
    expect(index.update().state().data).toEqual(null);
  });
});

describe('Index test with Snapshot Testing', () => {
  it('should show Index', () => {
    const component = renderer.create(<Index data={page1} error={null} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
