import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import CardList from '../CardList';

const Home = ({data, error}) => [
  <Header key="header" />,
  <CardList data={data} key="cardlist" error={error} />,
];

Home.propTypes = {
  data: PropTypes.object,
  error: PropTypes.object,
};

Home.defaultProps = {
  data: null,
  error: null,
};

export default Home;
