import React from 'react';
import PropTypes from 'prop-types';
import Container from '../Layout/Container';
import Content from '../Layout/Content';
import Search from './Search';

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

const Header = ({handleSearch}) => (
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
          <Search onSubmit={handleSearch} />
          <div style={LOGIN_WRAPPER_STYLE}>
            <a
              className="btn btn-success"
              style={LOGIN_BUTTON_STYLE}
            >
              Login
            </a>
          </div>
        </Content>
      </Container>
    </nav>
  </header>
);

Header.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Header;
