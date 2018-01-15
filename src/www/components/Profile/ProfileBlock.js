import React from 'react';
import PropTypes from 'prop-types';

const FIELD_STYLES = {
  flexBasis: '50%',
  padding: '20px 10px 20px 0',
};

const BIG_FIELD_STYLE = {
  flexBasis: '100%',
  margin: '20px 0',
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

const TEXTAREA_STYLES = {
  resize: 'vertical',
};

const ProfileBlock = ({block, handler}) => {
  switch (block.title) {
    case 'bio':
      return (
        <div style={BIG_FIELD_STYLE}>
          <div style={FIELD_TITLE_STYLES}>{block.title}</div>
          <textarea
            className="form-control"
            type="date"
            maxLength="500"
            style={TEXTAREA_STYLES}
            onChange={handler}
            defaultValue={block.value}
          />
        </div>
      );
    case 'birthdate':
      return (
        <div style={FIELD_STYLES}>
          <div style={FIELD_TITLE_STYLES}>{block.title}</div>
          <input
            className="form-control"
            type="date"
            defaultValue={block.value}
            onChange={handler}
          />
        </div>
      );
    case 'favorite_color':
      return (
        <div style={FIELD_STYLES}>
          <div style={FIELD_TITLE_STYLES}>{block.title}</div>
          <input
            className="form-control"
            type="color"
            defaultValue={block.value}
            onChange={handler}
          />
        </div>
      );
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
  handler: PropTypes.func,
};

ProfileBlock.defaultProps = {
  handler: () => {},
};

export default ProfileBlock;
