import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from '../components/Header';
import CardList from '../components/CardList';

export default class Home extends React.Component {
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
      <div>
        <Header />
        <CardList data={data} />
      </div>
    );
  }
}
