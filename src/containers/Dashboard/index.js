import React from 'react';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { getUserFromToken } from '../../utils/request';
import CitizenDashboard from '../CitizenDashboard';
import CommissionerDashboard from '../CommissionerDashboard';
import reducer from './reducer';
import saga from './saga';

const key = 'dashbaord';

function Dashboard() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const user = getUserFromToken();
  return (
    <main>
      <title>Dashboard - {user.role} </title>
      <h1>Dashboard - {user.role} </h1>
      {user.role === 'CITIZEN' ? (
          <CitizenDashboard user />
        ) : (
          <CommissionerDashboard user />
        )
      }
    </main>
  );
}

export default Dashboard;
