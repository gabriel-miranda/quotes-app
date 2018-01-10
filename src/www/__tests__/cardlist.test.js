/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import CardList from '../components/CardList';
import Card from '../components/Card';
import Alert from '../components/Alert';

const data = {
  results: [
    {id: 1, text: 'Test', authorName: ''},
    {id: 2, text: 'Test', authorName: ''},
  ],
};

const error = new Error('Test error');

describe('CardList test with enzyme', () => {
  it('should show an error if an error happened', () => {
    const cardList = shallow(<CardList />);
    cardList.setProps({data, error});
    expect(cardList.contains(<Alert />)).toEqual(true);
  });

  it('should not show an error if no error is provided', () => {
    const cardList = shallow(<CardList />);
    cardList.setProps({data});
    expect(cardList.contains(<Alert />)).toEqual(false);
  });

  it('should show a card if data is provided', () => {
    const cardList = shallow(<CardList />);
    cardList.setProps({data});
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
    const component = renderer.create(<CardList data={data} error={error} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
