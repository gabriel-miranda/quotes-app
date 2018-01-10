import React from 'react';
import Container from '../Layout/Container';

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

const Header = () => (
  <header className="site-header">
    <nav className="navbar navbar-default">
      <Container>
        <div className="navbar-header">
          <div style={QUOTES_LOGO_STYLES}>
            <img
              src="/static/logo.png"
              alt="quotes app logo"
              style={LOGO_STYLES}
            />
            <h1 style={LOGO_TITLE_STYLES}>
              Quotes app
            </h1>
          </div>
        </div>
      </Container>
    </nav>
  </header>
);

export default Header;
