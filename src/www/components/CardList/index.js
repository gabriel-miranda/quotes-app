import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Container from '../Layout/Container';
import Content from '../Layout/Content';
import Card from '../Card';
import ErrorMessage from '../ErrorMessage';
import NoResults from '../NoResults';
import Spinner from '../Spinner';

const isLoading = data => (
  !data || !data.pagination || data.pagination.page !== data.pagination.pageCount
);

const haveNoResults = data => (
  !isLoading(data) && !data.results.length
);

const CardItem = props => <Card key={props.id} {...props} />;

const CardList = ({
  data,
  error,
  fetching,
  loadNextPage,
}) => (
  <Container>
    <Content>
      {data &&
        data.results.map(CardItem)
      }
      {haveNoResults(data) &&
        <NoResults />
      }
      {error &&
        <ErrorMessage />
      }
      {isLoading(data) &&
        <Spinner />
      }
      {(!fetching && isLoading(data)) &&
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
  fetching: PropTypes.bool,
  loadNextPage: PropTypes.func.isRequired,
};

CardList.defaultProps = {
  data: null,
  error: null,
  fetching: true,
};

export default CardList;
