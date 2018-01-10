import React from 'react';
import PropTypes from 'prop-types';
import Home from '../components/Home';
import QuotesApiClient from '../utils/QuotesApiClient';

export default class Index extends React.Component {
  static async getInitialProps({req}) {
    let data;
    let error;
    try {
      const api = new QuotesApiClient(req);
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

  render() {
    const { data, error } = this.props;
    return (
      <Home
        data={data}
        error={error}
      />
    );
  }
}
