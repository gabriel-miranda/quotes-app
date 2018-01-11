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
    loading: true,
    fetching: false,
  }

  setFetching = (cb) => {
    this.setState({fetching: true}, cb);
  }

  loadNextPage = async () => {
    try {
      const { data } = this.state;
      const { page } = data.pagination;
      const _page = await _api().quotes.get({page: page + 1});
      const results = uniqBy(data.results.concat(_page.results), 'id');
      this.addNewPage({..._page, results});
    } catch (e) {
      console.error(e);
      this.setState({fetching: false});
    }
  }

  addNewPage = (data) => {
    this.setState({data, fetching: false}, this.checkLoading);
  }

  checkLoading = () => {
    const { pagination: { page, pageCount } } = this.state.data;
    if (page === pageCount) {
      this.setState({loading: false});
    }
  }

  handleLoadNextPage = () => {
    this.setFetching(this.loadNextPage);
  }

  render() {
    const {
      data,
      error,
      loading,
      fetching,
    } = this.state;

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
