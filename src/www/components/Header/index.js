import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import Container from '../Layout/Container';
import Content from '../Layout/Content';
import Search from './Search';
import Auth from '../../utils/Auth';

const goToProfile = () => Router.push('/profile');

const { login, isAuthenticated, logout } = new Auth();

const HEADER_STYLES = {
  background: '#fff',
};

const QUOTES_LOGO_STYLES = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
};

const LOGO_STYLES = {
  height: '42px',
  margin: '0 1em 0 0',
};

const LOGO_TITLE_STYLES = {
  margin: '0',
  fontSize: '25px',
};

const LOGIN_WRAPPER_STYLE = {
  padding: '5px',
  float: 'right',
};

const LOGIN_BUTTON_STYLE = {
  fontSize: '11px',
  color: '#fff',
  padding: '7px 14px',
};

const PROFILE_ICON_STYLES = {
  fontSize: '18px',
  padding: '0 15px',
  position: 'relative',
  top: '3px',
  cursor: 'pointer',
};

const Header = ({handleSearch, profile}) => (
  <header className="site-header" style={HEADER_STYLES}>
    <nav className="navbar navbar-default">
      <Container>
        <Content>
          <div className="navbar-header pull-left">
            <Link href="/">
              <a style={QUOTES_LOGO_STYLES}>
                <img
                  src="/static/logo.png"
                  alt="quotes app logo"
                  style={LOGO_STYLES}
                />
                <h1 style={LOGO_TITLE_STYLES}>
                  <span className="hidden-xs">
                    Quotes app
                  </span>
                  <span className="hidden-sm hidden-md hidden-lg">
                    QA
                  </span>
                </h1>
              </a>
            </Link>
          </div>
          {!profile && [
            <Search onSubmit={handleSearch} key="search" />,
            <div style={LOGIN_WRAPPER_STYLE} key="login">
              {!isAuthenticated() &&
                <a
                  className="btn btn-success"
                  style={LOGIN_BUTTON_STYLE}
                  onClick={login}
                >
                  Login
                </a>
              }
              {isAuthenticated() &&
                <i
                  className="icon-budicon-289 icon"
                  style={PROFILE_ICON_STYLES}
                  onClick={goToProfile}
                />
              }
            </div>,
          ]}
          {profile && isAuthenticated() &&
            <div style={LOGIN_WRAPPER_STYLE}>
              <a
                className="btn btn-success"
                style={LOGIN_BUTTON_STYLE}
                onClick={logout}
              >
                Logout
              </a>
            </div>
          }
        </Content>
      </Container>
    </nav>
  </header>
);

Header.propTypes = {
  handleSearch: PropTypes.func,
  profile: PropTypes.bool,
};

Header.defaultProps = {
  handleSearch: null,
  profile: false,
};

export default Header;
