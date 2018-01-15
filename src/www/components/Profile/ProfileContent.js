import React from 'react';
import PropTypes from 'prop-types';
import Content from '../Layout/Content';
import Container from '../Layout/Container';
import ProfileBlock from './ProfileBlock';

const TAB_CONTENT_STYLES = {
  padding: '0 20px',
  background: '#fff',
  margin: '20px 0',
};

const FORM_GROUP_STYLES = {
  marginBottom: '5px',
  display: 'flex',
  flexFlow: 'row wrap',
};

export default class ProfileContent extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  };
  static defaultProps = {
    data: null,
  };
  renderBlock = (title) => {
    const { data } = this.props;
    return (
      <ProfileBlock
        block={{title, value: data[title]}}
        key={title}
      />
    );
  }
  render() {
    const { data } = this.props;
    return (
      <Container>
        <Content>
          <div style={TAB_CONTENT_STYLES}>
            <div style={FORM_GROUP_STYLES}>
              {Object.keys(data).map(this.renderBlock)}
            </div>
          </div>
        </Content>
      </Container>
    );
  }
}
