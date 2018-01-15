import React from 'react';
import PropTypes from 'prop-types';

const SPINNER_STYLE = {
  margin: '0 auto 20px',
};

const SPINNER_SM_STYLE = {
  margin: '9px',
};

const Spinner = ({size, auth0}) => (
  <div
    className={`spinner spinner-${size} ${auth0 ? 'is-auth0' : ''}`}
    style={size === 'sm' ? SPINNER_SM_STYLE : SPINNER_STYLE}
  >
    <div className="circle" />
  </div>
);

Spinner.propTypes = {
  size: PropTypes.oneOf([
    'xs',
    'sm',
    'md',
    'lg',
  ]),
  auth0: PropTypes.bool,
};

Spinner.defaultProps = {
  size: 'lg',
  auth0: true,
};

export default Spinner;
