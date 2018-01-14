import React from 'react';
import PropTypes from 'prop-types';

const Content = ({children}) => (
  <div className="row">
    <div className="col-md-6 col-md-offset-3 clearfix">
      {children}
    </div>
  </div>
);

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;
