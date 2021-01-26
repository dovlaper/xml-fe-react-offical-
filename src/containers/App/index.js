import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { useInjectSaga } from '../../utils/injectSaga';
import Routes from './Routes';
import { fetchAuthenticatedUser, logout } from './actions';
import { makeSelectToken, makeSelectUser } from './selectors';
// import saga from './saga';
import AppBar from '../../components/AppBar';
import { BrowserRouter } from 'react-router-dom';
import { getUserFromToken } from '../../utils/request';
import 'bootstrap/dist/css/bootstrap.min.css';

const key = 'app';

function App() {
  // useInjectSaga({ key, saga });

  const dispatch = useDispatch();

  const token = useSelector(makeSelectToken());
  const user = getUserFromToken()
 
  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  const renderLoadingIndicator = <div>Loading...</div>;

  return (
      <SnackbarProvider>
        <BrowserRouter>
        {token && !user ? (
          renderLoadingIndicator
        ) : (
          <>
            {user && <AppBar onLogout={handleLogout} />}
            <Routes />
          </>
        )}
        {/* <Notifier /> */}
        </BrowserRouter>
      </SnackbarProvider>
  );
}

export default App;
