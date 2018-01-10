import React from 'react';
import PropTypes from 'prop-types';

const CARD_STYLES = {
  margin: '20px 0',
  padding: '20px',
  borderRadius: '3px',
};

const Card = ({id, text, authorName}) => (
  <div className="card-docs" style={CARD_STYLES}>
    <p>Quote <strong>#{id}</strong></p>
    <p>"{text}"</p>
    <p>
      <strong>
        <em>
          - {authorName || 'Anonymous'}
        </em>
      </strong>
    </p>
  </div>
);

Card.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
};

export default Card;
