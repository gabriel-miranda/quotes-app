import React from 'react';
import Container from '../Layout/Container';
import Content from '../Layout/Content';

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

const Header = () => (
  <header className="site-header" style={HEADER_STYLES}>
    <nav className="navbar navbar-default">
      <Container>
        <Content>
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
        </Content>
      </Container>
    </nav>
  </header>
);

export default Header;
