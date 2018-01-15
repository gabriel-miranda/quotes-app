import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import ProfileContent from './ProfileContent';

const Profile = ({
  data,
  error,
  loading,
}) => [
  <Header
    key="header"
    profile
  />,
  <ProfileContent
    data={data}
    key="profile"
  />,
];

Profile.propTypes = {
  data: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
};

Profile.defaultProps = {
  data: null,
  error: null,
  loading: false,
};

export default Profile;
