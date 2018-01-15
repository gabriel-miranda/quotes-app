import React from 'react';
import PropTypes from 'prop-types';
import Container from '../Layout/Container';
import Content from '../Layout/Content';
import Search from './Search';
import Auth from '../../utils/Auth';

const { login, isAuthenticated, logout } = new Auth();

const HEADER_STYLES = {
  background: '#fff',
};

const QUOTES_LOGO_STYLES = {
  display: 'flex',
  alignItems: 'center',
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

const Header = ({handleSearch, profile}) => (
  <header className="site-header" style={HEADER_STYLES}>
    <nav className="navbar navbar-default">
      <Container>
        <Content>
          <div className="navbar-header pull-left">
            <div style={QUOTES_LOGO_STYLES}>
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
            </div>
          </div>
          {!profile && [
            <Search onSubmit={handleSearch} />,
            <div style={LOGIN_WRAPPER_STYLE}>
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
                <a
                  className="btn btn-success"
                  style={LOGIN_BUTTON_STYLE}
                  onClick={logout}
                >
                  Logout
                </a>
              }
            </div>,
          ]}
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
