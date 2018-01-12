import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Container from '../Layout/Container';
import Content from '../Layout/Content';
import Card from '../Card';
import ErrorMessage from '../ErrorMessage';
import NoResults from '../NoResults';
import Spinner from '../Spinner';

const isLastPage = data => (
  data.pagination.pageCount <= data.pagination.page
);

const showSpinner = data => (
  !data || !isLastPage(data)
);

const canLoadMoreData = data => (
  data && !isLastPage(data)
);

const haveNoResults = data => (
  !showSpinner(data) && !data.results.length
);

const CardItem = props => <Card key={props.id} {...props} />;

const CardList = ({
  data,
  error,
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
      {showSpinner(data) &&
        <Spinner />
      }
      {canLoadMoreData(data) &&
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
  loadNextPage: PropTypes.func.isRequired,
};

CardList.defaultProps = {
  data: null,
  error: null,
};

export default CardList;
