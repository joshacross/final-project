import React from "react";
import { makeStyles, createTheme } from '@material-ui/core/styles';


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    minWidth: '100vw',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/images/LandingPage.jpg'})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    [theme.breakpoints.up('md')]: {
      minHeight: '100vh',
      minWidth: '600',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/images/LandingPage.jpg'})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '100vh',
      minWidth: '375',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/images/LandingPage.jpg'})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
    }

  }
}));

const Home = () => {

  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
    </div>
  );
};

export default Home;
