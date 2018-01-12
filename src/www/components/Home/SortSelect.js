import React from 'react';
import PropTypes from 'prop-types';
import sorts from '../../utils/sorts';
import Container from '../Layout/Container';
import Content from '../Layout/Content';

const SORT_STYLE = {
  width: 'auto',
  margin: '20px 0 0',
};

const SortOption = value => (
  <option key={value} value={value}>
    {sorts[value]}
  </option>
);

export default class SortSelect extends React.Component {
  static propTypes = {
    changeSort: PropTypes.func.isRequired,
  };

  handleChangeSort = (e) => {
    const sortBy = e.target.value;
    this.props.changeSort(sortBy);
  }

  render() {
    return (
      <Container>
        <Content>
          <select
            className="form-control pull-right"
            onChange={this.handleChangeSort}
            style={SORT_STYLE}
          >
            {Object.keys(sorts).map(SortOption)}
          </select>
        </Content>
      </Container>
    );
  }
}
