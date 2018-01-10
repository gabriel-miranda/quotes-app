import React from 'react';
import PropTypes from 'prop-types';
import Container from '../Layout/Container';
import Content from '../Layout/Content';
import Card from '../Card';

const CardItem = props => <Card key={props.id} {...props} />;

const CardList = ({data}) => (
  <Container>
    <Content>
      {data.results.map(CardItem)}
    </Content>
  </Container>
);

CardItem.propTypes = {
  id: PropTypes.string.isRequired,
};

CardList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CardList;
