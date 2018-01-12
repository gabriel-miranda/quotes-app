import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import CardList from '../CardList';
import SortSelect from './SortSelect';

const Home = ({
  data,
  error,
  loading,
  loadNextPage,
  changeSort,
  handleSearch,
}) => [
  <Header
    key="header"
    handleSearch={handleSearch}
  />,
  <SortSelect
    changeSort={changeSort}
    key="sort"
  />,
  <CardList
    data={data}
    key="cardlist"
    error={error}
    loading={loading}
    loadNextPage={loadNextPage}
  />,
];

Home.propTypes = {
  data: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
  loadNextPage: PropTypes.func.isRequired,
  changeSort: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

Home.defaultProps = {
  data: null,
  error: null,
  loading: false,
};

export default Home;
