import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { useInjectSaga } from '../../utils/injectSaga';
import Routes from './Routes';
import { logout, setError } from './actions';
import { makeSelectError, makeSelectToken } from './selectors';
// import saga from './saga';
import AppBar from '../../components/AppBar';
import { BrowserRouter } from 'react-router-dom';
import { getUserFromToken } from '../../utils/request';
import 'bootstrap/dist/css/bootstrap.min.css';
import saga from './saga'
import ErrorModal from './ErrorModal';

const key = 'app';

function App() {
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();

  const token = useSelector(makeSelectToken());
  const user = getUserFromToken()
  const error = useSelector(makeSelectError());
  const handleLogout = useCallback(() => {dispatch(logout()); console.log(window.location.reload(true));
  }, [dispatch]);
  const renderLoadingIndicator = <div>Loading...</div>;

  const handleErrorClose = () => {
    dispatch(setError(null))
  }

  return (
      <SnackbarProvider>
        <BrowserRouter>
        {token && !user ? (
          renderLoadingIndicator
        ) : (
          <>
            {user && <AppBar onLogout={handleLogout} />}
            <Routes />
            {!!error && (<ErrorModal show={!!error} error={error} close={handleErrorClose}/>)}
          </>
        )}
        {/* <Notifier /> */}
        </BrowserRouter>
      </SnackbarProvider>
  );
}

export default App;
