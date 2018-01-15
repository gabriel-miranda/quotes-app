import React from 'react';
import PropTypes from 'prop-types';
import Content from '../Layout/Content';
import Container from '../Layout/Container';
import ProfileBlock from './ProfileBlock';
import MetadataApiClient from '../../utils/MetadataApiClient';
import Auth from '../../utils/Auth';

const auth = new Auth();
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

const DONE_STYLES = {
  padding: '5px 15px 0',
  margin: '0',
};

export default class ProfileContentContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    updateProfile: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: null,
  };

  state = {
    bio: this.props.data.bio,
    birthdate: this.props.data.birthdate,
    favorite_color: this.props.data.favorite_color, // eslint-disable-line
  }

  getData() {
    return { ...this.props.data, ...this.state };
  }

  getHandlers() {
    return {
      bio: this.handleChangeBio,
      birthdate: this.handleChangeBirthdate,
      favorite_color: this.handleChangeFavoriteColor, // eslint-disable-line
    };
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
    const favorite_color = e.target.value; // eslint-disable-line
    this.setState({favorite_color});
  }

  render() {
    return (
      <ProfileContent
        data={this.getData()}
        handlers={this.getHandlers()}
        updateProfile={this.props.updateProfile}
      />
    );
  }
}

class ProfileContent extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    handlers: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: null,
  };

  state = { done: false, loading: false };

  save = async () => {
    try {
      this.setState({loading: true});
      const { bio, birthdate, favorite_color } = this.props.data; // eslint-disable-line
      await api.update({ bio, birthdate, favorite_color });
      auth.renewToken(async () => {
        await this.props.updateProfile();
        this.setState({done: true, loading: false}, () => {
          setTimeout(() => this.setState({done: false}), 2000);
        });
      });
    } catch (e) {
      this.setState({loading: false});
      console.error(e);
    }
  }

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
              className={`btn btn-success pull-right ${this.state.loading && 'disabled'}`}
              onClick={this.save}
            >
              Save
            </div>
            {this.state.done &&
              <p className="pull-right" style={DONE_STYLES}>
                Done!
              </p>
            }
          </div>
        </Content>
      </Container>
    );
  }
}
