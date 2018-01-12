/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import CardList from '../components/CardList';
import Card from '../components/Card';
import ErrorMessage from '../components/ErrorMessage';

import page1 from './__mocks__/page1.mock';

const error = new Error('Test error');

describe('CardList test with enzyme', () => {
  it('should show an error if an error happened', () => {
    const cardList = shallow(<CardList data={page1} error={error} />);
    expect(cardList.contains(<ErrorMessage />)).toEqual(true);
  });

  it('should not show an error if no error is provided', () => {
    const cardList = shallow(<CardList data={page1} />);
    expect(cardList.contains(<ErrorMessage />)).toEqual(false);
  });

  it('should show a card if data is provided', () => {
    const cardList = shallow(<CardList data={page1} />);
    expect(cardList.find(Card).length).toBeGreaterThan(0);
  });
});

describe('CardList test with Snapshot Testing', () => {
  it('should show cardlist correctly', () => {
    const component = renderer.create(<CardList />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show cardlist with props correctly', () => {
    const component = renderer.create(<CardList data={page1} error={error} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
