import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { REQUESTS, INFORMATION } from '../../routes';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu'
import { green } from '@material-ui/core/colors';
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

export default function ButtonAppBar({onLogout}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color={green[400]}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} style={{textDecoration:'none'}} to={REQUESTS}>Requests</Link>
            <Link className={classes.link} style={{textDecoration:'none'}} to={INFORMATION}>Information</Link>
          </Typography>
          <Button color="inherit" onClick={onLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}