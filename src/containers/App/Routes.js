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
  CITIZEN,
  RESCRIPTS,
  APPEALS,
  SILENCE_APPEALS,
  DECISION_APPEALS
} from '../../routes';
import { getUserFromToken } from '../../utils/request';
import Rescript from '../../components/Rescript';
import SilenceAppeals from '../SilenceAppeals'
import DecisionAppeals from '../DecisionAppeals';
import Rescripts from '../Rescripts';

export default function Routes() {
  
const user = getUserFromToken();
const isAuthenticated = !!user;
console.log(isAuthenticated)
  return (
    <Switch>
      <PublicRoute exact path={WELCOME} component={WelcomePage} />
      <PrivateRoute exact path={DASHBOARD} component={Dashboard}/>
      <PrivateRoute exact path={COMMISSIONER} component={CommissionerDashboard} isAuthenticated={!!user} canAccess={user?.role === "ROLE_COMMISSIONER"}  />
      <PrivateRoute exact path={CITIZEN} component={CitizenDashboard} isAuthenticated={!!user}  canAccess={user?.role === "ROLE_CITIZEN"}  />
      <PrivateRoute exact path={USER_PROFILE} component={UserProfilePage} />
      <PublicRoute exact path={LOGIN} component={LoginPage} />
      <PublicRoute exact path={REGISTER} component={RegisterPage} />
      <PrivateRoute exact path={RESCRIPTS} component={Rescripts} isAuthenticated={!!user} />
      <PrivateRoute exact path={DECISION_APPEALS} component={DecisionAppeals} isAuthenticated={!!user} />
      <PrivateRoute exact path={SILENCE_APPEALS} component={SilenceAppeals} isAuthenticated={!!user} />
      
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
