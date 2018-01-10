import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Home from '../components/Home';

export default class Index extends React.Component {
  static async getInitialProps() {
    let data;
    try {
      const request = await axios.get('https://auth0-exercise-quotes-api.herokuapp.com/api/quotes');
      ({ data } = request);
    } catch (e) {
      console.error(e);
    }
    return { data };
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  render() {
    const { data } = this.props;
    return (
      <Home data={data} />
    );
  }
}
