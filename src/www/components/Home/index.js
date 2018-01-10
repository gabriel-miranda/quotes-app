import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import CardList from '../CardList';

const Home = ({data}) => [
  <Header key="header" />,
  <CardList data={data} key="cardlist" />,
];

Home.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Home;
