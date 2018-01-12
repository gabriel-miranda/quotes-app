import React from 'react';
import PropTypes from 'prop-types';
import uniqBy from 'lodash.uniqby';
import Home from '../components/Home';
import QuotesApiClient from '../utils/QuotesApiClient';
import sorts from '../utils/sorts';

const _api = req => new QuotesApiClient(req);

const DEFAULT_SORT = Object.keys(sorts)[0];

export default class Index extends React.Component {
  static async getInitialProps({req}) {
    let data;
    let error;
    try {
      const api = _api(req);
      data = await api.quotes.get();
    } catch (e) {
      console.error(e);
      error = e;
    }
    return { data, error };
  }

  static propTypes = {
    data: PropTypes.object,
    error: PropTypes.object,
  };

  static defaultProps = {
    data: null,
    error: null,
  };

  state = {
    data: this.props.data,
    error: this.props.error,
    sortBy: DEFAULT_SORT,
    searchQuery: null,
  }

  buildQuery() {
    const { searchQuery } = this.state;
    if (searchQuery) {
      const { field, text } = searchQuery;
      return {[field]: text};
    }
    return {};
  }

  buildParams = (key) => {
    const { sortBy } = this.state;
    const query = this.buildQuery();
    switch (key) {
      case 'searchQuery':
        return {
          sortBy: DEFAULT_SORT,
          ...query,
        };
      default:
        return {
          sortBy,
          ...query,
        };
    }
  }

  buildResetState(key) {
    const state = {
      data: null,
      sortBy: DEFAULT_SORT,
    };
    switch (key) {
      case 'sortBy':
        return {
          ...state,
          sortBy: this.state[key],
        };
      case 'searchQuery':
        return {
          ...state,
          searchQuery: this.state[key],
        };
      default:
        return state;
    }
  }

  loadNextPage = async () => {
    const { data } = this.state;
    const { page } = data.pagination;
    const params = this.buildParams();
    this.addNewPage(await _api()
      .quotes
      .get({
        page: page + 1,
        ...params,
      })
    );
  }

  addNewPage = (next) => {
    const { data } = this.state;
    const results = uniqBy(
      data.results.concat(next.results),
      'id',
    );
    this.setState({
      data: {
        ...next,
        results,
      },
    });
  }

  reset = (key) => {
    this.setState(this.buildResetState(key), async () => {
      const data = await _api().quotes.get(this.buildParams(key));
      this.setState({data});
    });
  }

  handleChangeSort = (sortBy) => {
    this.setState({sortBy}, () => {
      this.reset('sortBy');
    });
  }

  handleSearch = (field, text) => {
    this.setState({searchQuery: {field, text}}, () => {
      this.reset('searchQuery');
    });
  }

  render() {
    const { data, error } = this.state;

    return (
      <Home
        data={data}
        error={error}
        loadNextPage={this.loadNextPage}
        changeSort={this.handleChangeSort}
        handleSearch={this.handleSearch}
      />
    );
  }
}
