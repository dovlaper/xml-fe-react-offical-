import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
import OfficalDashboard from '../OfficalDashboard/Loadable';
import CitizenDashboard from '../CitizenDashboard/Loadable';
import {
  WELCOME,
  DASHBOARD,
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  USER_PROFILE,
  OFFICAL,
  CITIZEN,
  RESCRIPTS,

  REPORTS,
  INFORMATION,
  REQUESTS
} from '../../routes';
import { getUserFromToken } from '../../utils/request';
import InformationPage from '../InformationPage'
import RequestPage from '../RequestPage';
import Rescripts from '../Rescripts';
import Reports from '../Reports';

export default function Routes() {
  
const user = getUserFromToken();
const isAuthenticated = !!user;
console.log(isAuthenticated)
  return (
    <Switch>
      <PublicRoute exact path={WELCOME} component={WelcomePage} />
      <PrivateRoute exact path={DASHBOARD} component={Dashboard}/>
      <PrivateRoute exact path={OFFICAL} component={OfficalDashboard} isAuthenticated={true} canAccess={user?.role === "ROLE_OFFICIAL"}  />
      <PrivateRoute exact path={CITIZEN} component={CitizenDashboard} isAuthenticated={!!user}  canAccess={user?.role === "ROLE_CITIZEN"}  />
      <PrivateRoute exact path={USER_PROFILE} component={UserProfilePage} />
      <PublicRoute exact path={LOGIN} component={LoginPage} />
      <PublicRoute exact path={REGISTER} component={RegisterPage} />
      <PrivateRoute exact path={RESCRIPTS} component={Rescripts} isAuthenticated={!!user} />
      <PrivateRoute exact path={INFORMATION} component={InformationPage} isAuthenticated={!!user} />
      <PrivateRoute exact path={REQUESTS} component={RequestPage} isAuthenticated={!!user} />
      <PrivateRoute exact path={REPORTS} component={Reports} isAuthenticated={!!user} />

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
