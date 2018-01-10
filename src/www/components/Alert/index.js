import React from 'react';
import PropTypes from 'prop-types';

const ALERT_STYLES = {
  margin: '20px 0 0',
};

const Alert = ({children, type}) => (
  <div className={`alert alert-${type}`} style={ALERT_STYLES}>
    {children}
  </div>
);

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    'default',
    'success',
    'info',
    'warning',
    'danger',
  ]),
};

Alert.defaultProps = {
  type: 'default',
};

export default Alert;
