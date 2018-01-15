import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../utils/Auth';
import promisify from '../utils/promisify';
import Profile from '../components/Profile';

const auth = new Auth();

const goHome = (res) => {
  res.writeHead(302, { Location: '/' });
  res.end();
};

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

  state = {
    data: this.props.data,
    error: this.props.error,
  }

  getData() {
    const _data = this.state.data;
    const unwanted = ['email_verified', 'updated_at', 'sub', 'picture'];
    Object.keys(_data).forEach((k) => {
      if ((unwanted).includes(k)) {
        delete _data[k];
      }
    });
    return _data;
  }

  render() {
    const { error } = this.state;
    return (
      <Profile
        data={this.getData()}
        error={error}
      />
    );
  }
}
