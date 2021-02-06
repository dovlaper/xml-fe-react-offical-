import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { REQUESTS, INFORMATION, APPEAL_ANNOUNCEMENT, REPORTS, RESCRIPTS } from '../../routes';
import { Link } from 'react-router-dom';
import { green } from '@material-ui/core/colors';
import { getRole } from '../../utils/request';
import { useDispatch } from 'react-redux';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from '../../containers/Reports/saga';
import { generate } from '../../containers/Reports/actions';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    margin: '10px',
    color:'#17a2b8',
    textDecoration:'none',
  }
}));
const key="reports";

export default function ButtonAppBar({onLogout}) {
  const classes = useStyles();
  const isOffical = getRole() === 'ROLE_OFFICIAL';
  const dispatch = useDispatch();
  useInjectSaga({key, saga})
  return (
    <div className={classes.root}>
      <AppBar position="static" color={green[400]}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} style={{textDecoration:'none'}} to={REQUESTS}>Requests</Link>
            <Link className={classes.link} style={{textDecoration:'none'}} to={INFORMATION}>Information</Link>
            {isOffical && (<Link className={classes.link} style={{textDecoration:'none'}} to={APPEAL_ANNOUNCEMENT}>Appeal Announcement</Link>)}
            {isOffical && (<Link className={classes.link} style={{textDecoration:'none'}} to={REPORTS}>Reports</Link>)}
            {isOffical && (<Button variant="primary" onClick={() => {dispatch(generate())}}> Generate Report</Button>)}
            {isOffical && (<Link className={classes.link} style={{textDecoration:'none'}} to={RESCRIPTS}>Rescripts</Link>)}

          </Typography>
          <Button color="inherit" onClick={onLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}