import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import CardList from '../CardList';

const Home = ({
  data,
  error,
  loading,
  fetching,
  loadNextPage,
}) => [
  <Header key="header" />,
  <CardList
    data={data}
    key="cardlist"
    error={error}
    loading={loading}
    fetching={fetching}
    loadNextPage={loadNextPage}
  />,
];

Home.propTypes = {
  data: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
  fetching: PropTypes.bool,
  loadNextPage: PropTypes.func.isRequired,
};

Home.defaultProps = {
  data: null,
  error: null,
  loading: false,
  fetching: true,
};

export default Home;
