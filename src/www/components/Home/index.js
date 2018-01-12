import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import CardList from '../CardList';
import sorts from '../../utils/sorts';
import Container from '../Layout/Container';
import Content from '../Layout/Content';

const SORT_STYLE = {
  width: 'auto',
  margin: '20px 0 0',
};

const SortOption = value => (
  <option key={value} value={value}>
    {sorts[value]}
  </option>
);

const SortSelect = ({changeSort}) => (
  <Container>
    <Content>
      <select
        className="form-control pull-right"
        onChange={changeSort}
        style={SORT_STYLE}
      >
        {Object.keys(sorts).map(SortOption)}
      </select>
    </Content>
  </Container>
);

SortSelect.propTypes = {
  changeSort: PropTypes.func.isRequired,
};

const Home = ({
  data,
  error,
  loading,
  loadNextPage,
  changeSort,
}) => [
  <Header key="header" />,
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
};

Home.defaultProps = {
  data: null,
  error: null,
  loading: false,
};

export default Home;
