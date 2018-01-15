import auth0 from 'auth0-js';
import Router from 'next/router';
import cookie from 'react-cookies';
import AUTH_CONFIG from './auth0-variables';

const DEFAULT_PATH = { path: '/' };

const _cookie = {
  load: name => cookie.load(name) || JSON.stringify({}),
};

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile email phone avatar user_metadata',
  });

  login = () => {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        Router.replace('/');
      } else if (err) {
        Router.replace('/');
        console.error(err);
      }
    });
  }

  setSession = (authResult, notReplace) => {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    cookie.save('access_token', authResult.accessToken, DEFAULT_PATH);
    cookie.save('id_token', authResult.idToken, DEFAULT_PATH);
    cookie.save('expires_at', expiresAt, DEFAULT_PATH);
    if (!notReplace) {
      Router.replace('/');
    }
  }

  logout = () => {
    cookie.remove('access_token', DEFAULT_PATH);
    cookie.remove('id_token', DEFAULT_PATH);
    cookie.remove('expires_at', DEFAULT_PATH);
    Router.replace('/');
  }

  isAuthenticated = () => {
    const expiresAt = JSON.parse(_cookie.load('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  getAccessToken = () => {
    const accessToken = cookie.load('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile = (cb) => {
    const accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  renewToken = (cb) => {
    this.auth0.checkSession({},
      (err, result) => {
        if (err) {
          console.error(
            `Could not get a new token (${err.error}: ${err.error_description}).`
          );
        } else {
          this.setSession(result, process.browser);
        }
        if (cb) {
          cb();
        }
      }
    );
  }

  scheduleRenewal = () => {
    const expiresAt = JSON.parse(_cookie.load('expires_at'));
    const delay = expiresAt - Date.now();
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewToken();
      }, delay);
    }
  }
}
