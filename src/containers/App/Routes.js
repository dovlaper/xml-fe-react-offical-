import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import WelcomePage from '../WelcomePage/Loadable';
import Dashboard from '../Dashboard/Loadable';
import UserProfilePage from '../UserProfilePage/Loadable';
import LoginPage from '../LoginPage/Loadable';
import RegisterPage from '../RegisterPage/Loadable';
import ForgotPasswordPage from '../ForgotPasswordPage/Loadable';
import ResetPasswordPage from '../ResetPasswordPage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import CommissionerDashboard from '../CommissionerDashboard/Loadable';
import CitizenDashboard from '../CitizenDashboard/Loadable';
import {
  WELCOME,
  DASHBOARD,
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  USER_PROFILE,
  COMMISSIONER,
  CITIZEN
} from '../../routes';
import { getUserFromToken } from '../../utils/request';

export default function Routes() {
  
const user = getUserFromToken()
  return (
    <Switch>
      <PublicRoute exact path={WELCOME} component={WelcomePage} />
      <PrivateRoute exact path={DASHBOARD} component={Dashboard}/>
      <PrivateRoute exact path={COMMISSIONER} component={CommissionerDashboard} canAccess={user?.role === "ROLE_COMMISSIONER"}  />
      <PrivateRoute exact path={CITIZEN} component={CitizenDashboard} canAccess={user?.role === "ROLE_CITIZEN"}  />
      <PrivateRoute exact path={USER_PROFILE} component={UserProfilePage} />
      <PublicRoute exact path={LOGIN} component={LoginPage} />
      <PublicRoute exact path={REGISTER} component={RegisterPage} />
      <PublicRoute
        exact
        path={FORGOT_PASSWORD}
        component={ForgotPasswordPage}
      />
      <PublicRoute exact path={RESET_PASSWORD} component={ResetPasswordPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}
