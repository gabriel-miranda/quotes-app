import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../utils/Auth';
import promisify from '../utils/promisify';
import AUTH0_CONFIG from '../utils/auth0-variables';
import Profile from '../components/Profile';

const auth = new Auth();

const goHome = (res) => {
  res.writeHead(302, { Location: '/' });
  res.end();
};

const METADATA_KEY = `https://${AUTH0_CONFIG.domain.replace(/\./g, ':')}/user_metadata`;

export default class ProfileContainer extends React.Component {
  static async getInitialProps({res}) {
    let data;
    let error;
    try {
      const { userProfile, getProfile, isAuthenticated } = auth;
      const getProfileAsync = promisify(getProfile);
      if (!isAuthenticated()) {
        goHome(res);
      }
      if (!userProfile) {
        data = await getProfileAsync();
      } else {
        data = userProfile;
      }
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

  getData() {
    const { data } = this.props;
    const set = {
      ...data,
      ...data[METADATA_KEY],
    };
    const _data = {};
    const whitelist = [
      'email',
      'name',
      'nickname',
      'bio',
      'birthdate',
      'favorite_color',
    ];
    Object.keys(set).forEach((k) => {
      if ((whitelist).includes(k)) {
        _data[k] = data[k] || data[METADATA_KEY][k];
      }
    });

    return _data;
  }

  render() {
    const { error } = this.props;
    return (
      <Profile
        data={this.getData()}
        error={error}
      />
    );
  }
}
