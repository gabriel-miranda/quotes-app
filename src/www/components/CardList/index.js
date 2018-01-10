import React from 'react';
import PropTypes from 'prop-types';
import Container from '../Layout/Container';
import Content from '../Layout/Content';
import Card from '../Card';
import Alert from '../Alert';

const CardItem = props => <Card key={props.id} {...props} />;

const CardList = ({data, error}) => (
  <Container>
    <Content>
      {data &&
        data.results.map(CardItem)
      }
      {error &&
        <Alert />
      }
    </Content>
  </Container>
);

CardItem.propTypes = {
  id: PropTypes.string.isRequired,
};

CardList.propTypes = {
  data: PropTypes.object,
  error: PropTypes.object,
};

CardList.defaultProps = {
  data: null,
  error: null,
};

export default CardList;
