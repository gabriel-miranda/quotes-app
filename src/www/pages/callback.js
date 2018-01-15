import React from 'react';
import Router from 'next/router';
import Auth from '../utils/Auth';
import Spinner from '../components/Spinner';

const auth = new Auth();

const CALLBACK_STYLES = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
};

export default class Callback extends React.Component {
  componentDidMount() {
    if (/access_token|id_token|error/.test(window.location.hash)) {
      auth.handleAuthentication();
    } else {
      Router.push('/');
    }
  }
  render() {
    return (
      <div style={CALLBACK_STYLES}>
        <Spinner />
      </div>
    );
  }
}
