import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Cart from '../Cart';

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
  navbar: {
    // backgroundColor: '#3da7bf'
    backgroundColor: '#2f4f4f'
  },
  nobullet: {
    listStyleType: "none"
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function Nav() {

  const classes = useStyles();

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/ProductList">
              View Our Products
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/ProductList">
              View Our Products
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  function landingRedirect() {
    if (Auth.loggedIn()) {
      return '/ProductList';
    }

    return '/'
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            <Link to= {landingRedirect()}  className={classes.logo}>
              <span role="img" aria-label="logo" alt="augmented retail logo"><img src='../../../images/ar.png' alt="augmented retail logo" /> </span>
              <div id='logo-title'>Augmented Retail</div>
            </Link>
          </Typography>
          
          {showNavigation()}
          <Cart />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
