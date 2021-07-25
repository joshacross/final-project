import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, makeStyles } from '@material-ui/core';

function ProductItem(item) {
  const {
    thumbnail,
    name,
    _id,
    price
  } = item;

const [state, dispatch] = useStoreContext();

const { cart } = state;

const addToCart = () => {
  // find cart item with matching id
  const itemInCart = cart.find((cartItem) => cartItem._id === _id);

  // if no match, call UPDATE with new purchase quantity
  if (itemInCart) {
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: _id,
      purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
    });
    idbPromise('cart', 'put', {
      ...itemInCart,
      purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
    });
  } else {
    dispatch({
      type: ADD_TO_CART,
      product: {...item, purchaseQuantity: 1}
    });
    idbPromise('cart', 'put', {...item, purchaseQuantity: 1});
  }
};
  


  const useStyles = makeStyles((theme) => ({
    root: {
      [theme.breakpoints.down("sm")]: {
        width: 150,
      },
      [theme.breakpoints.up("md")]: {
        width: 350,
          typography: {
            fontSize: '200rem',
          }
      },
      [theme.breakpoints.up("lg")]: {
        width: 300,
      },
      [theme.breakpoints.up("xlg")]: {
        width: 350,
      },
      borderRadius: 20,
      margin: 20,
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
      display: 'flex',
      flexDirection: 'column',
      justifyItems: 'flex-end',
      justifyContent: 'space-between',
    },
  media: {
    [theme.breakpoints.down("sm")]: {
      height: 100,
    },
    [theme.breakpoints.up("md")]: {
      height: 200,
    },
    [theme.breakpoints.up("lg")]: {
      height: 150,
    },
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: '1rem',
    },
    [theme.breakpoints.up("md")]: {
      fontSize: '2.5rem',
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: '1.5rem',
    },
    },
  actions: {
    [theme.breakpoints.down("sm")]: {
      fontSize: '.75rem',
    },
    [theme.breakpoints.up("md")]: {
      fontSize: '1.75rem',
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: '1rem',
    },
    textAlign: 'center',
  },
  justify: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    alignContent: "center",
  }
  }))

  const classes = useStyles();

  return (
    <Card className={classes.root} variant='outlined'>
      <CardActionArea>
        <Link to={`/products/${_id}`}>
        <CardMedia
          className={classes.media}
          image={`/images/${thumbnail}`}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom component="h2" className={classes.title}>
            {name}
          </Typography>
        </CardContent>
        </Link>
      </CardActionArea>
      <CardActions className={classes.justify}>
        <Typography className={classes.actions}>
          {price}
        </Typography>
        <Button color="primary" variant="outlined" onClick={addToCart} className={classes.actions}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}





export default ProductItem;
