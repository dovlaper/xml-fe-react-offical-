import React from 'react';
import { Redirect } from 'react-router';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { getUserFromToken } from '../../utils/request';
import CitizenDashboard from '../CitizenDashboard';
import OfficalDashboard from '../OfficalDashboard';
import reducer from './reducer';
import saga from './saga';

const key = 'dashbaord';

function Dashboard() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const user = getUserFromToken();
  return (
    <main>
      {user?.role === 'ROLE_CITIZEN' ? (
          <Redirect to={'/citizen'} />
        ) : (
          <Redirect to={'/offical'} />
        )
      }
    </main>
  );
}

export default Dashboard;
