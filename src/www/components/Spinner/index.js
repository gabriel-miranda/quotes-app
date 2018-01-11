import React from 'react';
import PropTypes from 'prop-types';

const SPINNER_STYLE = {
  margin: '0 auto 20px',
};

const Spinner = ({size}) => (
  <div className="spinner spinner-lg is-auth0" style={SPINNER_STYLE}>
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
};

Spinner.defaultProps = {
  size: 'lg',
};

export default Spinner;
