import React from "react";
import { Button, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
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

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag">🛍️</span>
          Augmented Retail
        </Link>
      </h1>

      <nav>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">

            </IconButton>
            <Typography variant="h6">
              
                <span role="img" aria-label="shopping bag">🛍️</span>
                <a href="/">Augmented Retail</a>
              
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
