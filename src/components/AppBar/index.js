import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DASHBOARD, USER_PROFILE } from '../../routes';

function AppBar({ onLogout }) {

  return (
    <div>
      {/* <Link to={DASHBOARD}>Vivify Ideas</Link> */}
      {/* <Link to={USER_PROFILE}>Profile</Link> */}
      <span onClick={onLogout}>Logout</span>
    </div>
  );
}

AppBar.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default AppBar;
