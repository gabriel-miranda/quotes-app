import React from 'react';
import PropTypes from 'prop-types';
import uniqBy from 'lodash.uniqby';
import Home from '../components/Home';
import QuotesApiClient from '../utils/QuotesApiClient';

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
  }

  setFetching = (cb) => {
    this.setState({fetching: true}, cb);
  }

  loadNextPage = async () => {
    try {
      const { page } = this.state.data.pagination;
      const next = await _api().quotes.get({page: page + 1});
      this.addNewPage(next);
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({fetching: false});
    }
  }

  addNewPage = (next) => {
    const { data } = this.state;
    const results = uniqBy(data.results.concat(next.results), 'id');
    this.setState({data: {...next, results}});
  }

  handleLoadNextPage = () => {
    this.setFetching(this.loadNextPage);
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
      />
    );
  }
}
