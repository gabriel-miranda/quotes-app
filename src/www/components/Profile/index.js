import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import ProfileContent from './ProfileContent';

const Profile = ({
  data,
  error,
  updateProfile,
}) => [
  <Header
    key="header"
    profile
  />,
  <ProfileContent
    data={data}
    updateProfile={updateProfile}
    key="profile"
  />,
];

Profile.propTypes = {
  data: PropTypes.object,
  error: PropTypes.object,
  updateProfile: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  data: null,
  error: null,
};

export default Profile;
