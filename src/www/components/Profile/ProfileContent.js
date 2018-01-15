import React from 'react';
import PropTypes from 'prop-types';
import Content from '../Layout/Content';
import Container from '../Layout/Container';
import ProfileBlock from './ProfileBlock';
import MetadataApiClient from '../../utils/MetadataApiClient';

const api = new MetadataApiClient();

const TAB_CONTENT_STYLES = {
  padding: '0 20px 20px',
  background: '#fff',
  margin: '20px 0',
};

const FORM_GROUP_STYLES = {
  marginBottom: '5px',
  display: 'flex',
  flexFlow: 'row wrap',
};

export default class ProfileContentContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  };

  static defaultProps = {
    data: null,
  };

  state = {
    bio: this.props.data.bio,
    birthdate: this.props.data.birthdate,
    favorite_color: this.props.data.favorite_color,
  }

  getData() {
    return { ...this.props.data, ...this.state };
  }

  getHandlers() {
    return {
      bio: this.handleChangeBio,
      birthdate: this.handleChangeBirthdate,
      favorite_color: this.handleChangeFavoriteColor,
    }
  }

  handleChangeBio = (e) => {
    const bio = e.target.value;
    this.setState({bio});
  }

  handleChangeBirthdate = (e) => {
    const birthdate = e.target.value;
    this.setState({birthdate});
  }

  handleChangeFavoriteColor = (e) => {
    const favorite_color = e.target.value;
    this.setState({favorite_color}); // eslint-disable-line
  }

  render() {
    return (
      <ProfileContent
        data={this.getData()}
        handlers={this.getHandlers()}
      />
    );
  }
}

class ProfileContent extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    handlers: PropTypes.object.isRequired,
  };
  static defaultProps = {
    data: null,
  };

  renderBlock = (title) => {
    const { data, handlers } = this.props;
    return (
      <ProfileBlock
        block={{title, value: data[title]}}
        handler={handlers[title]}
        key={title}
      />
    );
  }

  save = async () => {
    try {
      const { bio, birthdate, favorite_color } = this.props.data;
      await api.update({ bio, birthdate, favorite_color });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { data } = this.props;
    return (
      <Container>
        <Content>
          <div className="clearfix" style={TAB_CONTENT_STYLES}>
            <div style={FORM_GROUP_STYLES}>
              {Object.keys(data).map(this.renderBlock)}
            </div>
            <div
              className="btn btn-success pull-right"
              onClick={this.save}
            >
              Save
            </div>
          </div>
        </Content>
      </Container>
    );
  }
}
