import React from 'react';
import PropTypes from 'prop-types';

const FIELD_STYLES = {
  margin: '20px 0',
  flexBasis: '50%',
};

const FIELD_TITLE_STYLES = {
  fontWeight: '500',
  textTransform: 'uppercase',
  fontSize: '13px',
  letterSpacing: '1px',
  marginBottom: '10px',
  color: '#999',
};

const FIELD_VALUE_STYLES = {
  maxWidth: '170px',
  display: 'inline-block',
  verticalAlign: 'top',
};

const ProfileBlock = ({block}) => {
  switch (block.title) {
    default:
      return (
        <div style={FIELD_STYLES}>
          <div style={FIELD_TITLE_STYLES}>{block.title}</div>
          <span style={FIELD_VALUE_STYLES}>{block.value}</span>
        </div>
      );
  }
};

ProfileBlock.propTypes = {
  block: PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

export default ProfileBlock;
