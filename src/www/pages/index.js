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
    fetching: false,
    sortBy: sorts[0],
  }

  handleFetchingState = (cb) => {
    this.setState({fetching: true}, async () => {
      try {
        await cb();
      } catch (e) {
        console.error(e);
      } finally {
        this.setState({fetching: false});
      }
    });
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

  reset = async () => {
    const { sortBy } = this.state;
    const data = await _api().quotes.get({sortBy});
    this.setState({data});
  }

  handleLoadNextPage = () => {
    this.handleFetchingState(this.loadNextPage);
  }

  handleChangeSort = (e) => {
    const { data } = this.state;
    const sortBy = e.target.value;
    this.setState({sortBy, data: {...data, results: []}}, () => {
      this.handleFetchingState(this.reset);
    });
  }

  render() {
    const { data, error, fetching } = this.state;
    const { page, pageCount } = data;
    const loading = page === pageCount;

    return (
      <Home
        data={data}
        error={error}
        loading={loading}
        fetching={fetching}
        loadNextPage={this.handleLoadNextPage}
        changeSort={this.handleChangeSort}
      />
    );
  }
}
