import React from 'react';
import PropTypes from 'prop-types';
import uniqBy from 'lodash.uniqby';
import Home from '../components/Home';
import QuotesApiClient from '../utils/QuotesApiClient';
import sorts from '../utils/sorts';

const _api = req => new QuotesApiClient(req);

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
    sortBy: sorts[0],
  }

  loadNextPage = async () => {
    const { data, sortBy } = this.state;
    const { page } = data.pagination;
    this.addNewPage(await _api().quotes.get({page: page + 1, sortBy}));
  }

  addNewPage = (next) => {
    const { data } = this.state;
    const results = uniqBy(data.results.concat(next.results), 'id');
    this.setState({data: {...next, results}});
  }

  reset = async (sortBy) => {
    this.setState({sortBy, data: null}, async () => {
      const data = await _api().quotes.get({sortBy});
      this.setState({data});
    });
  }

  handleChangeSort = (e) => {
    const sortBy = e.target.value;
    this.reset(sortBy);
  }

  render() {
    const { data, error } = this.state;

    return (
      <Home
        data={data}
        error={error}
        loadNextPage={this.loadNextPage}
        changeSort={this.handleChangeSort}
      />
    );
  }
}
