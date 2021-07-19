import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

function ProductItem(item) {
  const {
    // modelImage,
    thumbnail,
    name,
    _id,
    price,
    quantity,
    // reviews
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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderRadius: 20,
  },
});
  const classes = useStyles();

  return (
    <Card className={classes.root} variant='outlined'>
      <CardActionArea>
        <CardMedia
          component="img"
          image={thumbnail}
          alt="Teddy Bear"
          title="Contemplative Reptile"
          height="140"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography size="small">
          {price}
        </Typography>
        <Button size="small" color="primary" onClick={addToCart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}




export default ProductItem;
