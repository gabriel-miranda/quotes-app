/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Card from '../components/Card';

const cardWithAuthor = {
  id: 23,
  text: 'This is a test quote',
  authorName: 'Gabriel',
};

const cardWithoutAuthor = {
  id: 24,
  text: 'This is a test quote without author',
  authorName: '',
};

describe('Card test with enzyme', () => {
  it('should show authorName correctly', () => {
    const card = shallow(<Card {...cardWithAuthor}/>);
    expect(card.find('em').text()).toEqual(cardWithAuthor.authorName);
  });
  it('should show Anonymous if no author is provided', () => {
    const card = shallow(<Card {...cardWithoutAuthor}/>);
    expect(card.find('em').text()).toEqual('Anonymous');
  });
});

describe('Header test with Snapshot Testing', () => {
  it('should show Card correctly', () => {
    const component = renderer.create(<Card  {...cardWithAuthor}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
