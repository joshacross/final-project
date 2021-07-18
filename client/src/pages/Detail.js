import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PRODUCTS } from '../utils/queries';
// import spinner from '../assets/spinner.gif';
import Cart from '../components/Cart';
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS
} from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import { Button } from '@material-ui/core';
// import AlertDialogSlide from '../components/QRPopup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TOGGLE_QR_POPUP } from '../utils/actions';
import QRCodeComponent from '../components/QRCode';
// var QRCode = require('qrcode.react');

function Detail() {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [state, dispatch] = useStoreContext();

  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({})

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

useEffect(() => {
  // already in global store
  if (products.length) {
    setCurrentProduct(products.find(product => product._id === id));
  } 
  // retrieved from server
  else if (data) {
    dispatch({
      type: UPDATE_PRODUCTS,
      products: data.products
    });

    data.products.forEach((product) => {
      idbPromise('products', 'put', product);
    });
  }
  // get cache from idb
  else if (!loading) {
    idbPromise('products', 'get').then((indexedProducts) => {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: indexedProducts
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
}, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
  
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 }
      });
      // if product is not in cart, add it to current shopping cart
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id
    });

    // upon removal from cart, delete the item from IndexedDB using the 'currentProduct._id' to locate what to remove
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  const handleClickOpen = () => {
    dispatch({ type: TOGGLE_QR_POPUP })
  };

  const handleClose = () => {
    dispatch({ type: TOGGLE_QR_POPUP });
  };

  // const mountNode = 'qrcode.png';

  // const QREvent = async (handleClickOpen) => {
  //   if (handleClickOpen) {
  //   React.render(
  //     <QRCode value={require('/products/' + {id} + '/ar')} />,
  //     mountNode
  //     );
  //   } else {
  //     return;
  //   }
  // };

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <Button onClick={addToCart}>Add to Cart</Button>
            <Button
              disabled={!cart.find(p => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </Button>
              <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                View In Your Environment
              </Button>
              <Dialog
                  open={state.qrOpen}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle id="alert-dialog-slide-title">{currentProduct.name}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-discription">
                      Scan the QR Code with your mobile device below to see {currentProduct.name} in your environment using Augmented Reality. After you scan the code, please scroll to the Hiro image below the QR code.
                      <QRCodeComponent />
                      {/* <img src="qrcode.png" alt="image of a QR Code that you are to scan with a mobile device"/> */}
                      <img src={require("./QR/HIRO.jpeg")} alt="qr code"/>
                      
                    </DialogContentText>

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Go Back
                    </Button>
                </DialogActions>
                </Dialog>
            </p>
          <img
            src={`/images/${currentProduct.thumbnail}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <h1>Loading...</h1> : null}
      <Cart />
    </>
  );
}

export default Detail;
