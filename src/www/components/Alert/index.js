import React from 'react';

const ALERT_STYLES = {
  margin: '20px 0 0',
};

export default () => (
  <div className="alert alert-danger" style={ALERT_STYLES}>
    <p>Something went wrong. Please try again in a few moments.</p>
  </div>
);
