import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Container from '../Layout/Container';
import Content from '../Layout/Content';
import Card from '../Card';
import ErrorMessage from '../ErrorMessage';
import NoResults from '../NoResults';
import Spinner from '../Spinner';

const CardItem = props => <Card key={props.id} {...props} />;

const CardList = ({
  data,
  error,
  loading,
  fetching,
  loadNextPage,
}) => (
  <Container>
    <Content>
      {data &&
        data.results.map(CardItem)
      }
      {(!data || !data.results.length) &&
        <NoResults />
      }
      {error &&
        <ErrorMessage />
      }
      {loading &&
        <Spinner />
      }
      {(!fetching && loading) &&
        <Waypoint
          key="quotes"
          onEnter={loadNextPage}
        />
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
  loading: PropTypes.bool,
  fetching: PropTypes.bool,
  loadNextPage: PropTypes.func.isRequired,
};

CardList.defaultProps = {
  data: null,
  error: null,
  loading: false,
  fetching: true,
};

export default CardList;
