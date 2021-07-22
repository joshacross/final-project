import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PRODUCTS } from '../utils/queries';
// import spinner from '../assets/spinner.gif';
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS
} from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import { Button } from '@material-ui/core';
//material modal
import Modal from '@material-ui/core/Modal';
//for styling modal
import { makeStyles } from '@material-ui/core/styles';
import QRCode from 'qrcode';

function Detail() {
  

  const [state, dispatch] = useStoreContext();
  const [imageUrl, setImageUrl] = useState('')

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
  

  const generateQRCode = async () => {
    try {
      const response = await QRCode.toDataURL(`http://localhost:3000/products/${id}/ar`);
      setImageUrl(response);
    }
    catch (error) {
      console.log(error);
    };
  }


  //set random modal style location
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  // fx to create modal style and set top and left
  //with transform for popup location
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  //theme and make styles for the modal size, look etc.
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 'auto',
      height: 'auto',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    buttons: {
      marginLeft: '1rem',
      marginRight: '1rem',
    }
  }));

  //access the paper object with its key/value pairs through classes.paper from useStyles() line 132
  const classes = useStyles();

  //render the modal on open and save in a local state
  const [modalStyle] = React.useState(getModalStyle);
  
  //the opening and closing saved to a local state because
  //this is the only place that needs it
  const [open, setOpen] = React.useState(false);

  // modal open (click function still activates QR code render)
  const handleOpen = () => {
      setOpen(true);
  };

  // modal close
  const handleClose = () => {
      setOpen(false);
  };
  

  // the inside of the modal saved to a variable
  const body = (
    <div style={modalStyle} className={classes.paper}>
    <h4 id="alert-dialog-slide-title">{currentProduct.name}</h4>
            <div id="alert-dialog-slide-discription">
              <p>In order to see {currentProduct.name} in your environment, please follow the instructions below:</p>
              <p>Using your camera app, scan the following QR Code with your mobile device.</p>
              <img src={imageUrl} alt='img' />
              <p>Click on the link that appears, and will open up your browser.</p>
              <p>Point your mobile device at the image below the QR Code that says "Hiro."</p>
              <img src={require('./QR/HIRO.jpeg')} alt='img' height='200' width='200' />
              <p>* Please note, the following augmented reality experience requires a mobile device.</p>
              <p>** If you are on a mobile device, please click here to see the product in 3D.</p>
      </div>
      </div>
  );

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <img
            src={`/images/${currentProduct.thumbnail}`}
            alt={currentProduct.name}
          />

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
          
          <Button onClick={addToCart} className={classes.buttons}>
            Add to Cart
          </Button>
          <Button
            disabled={!cart.find(p => p._id === currentProduct._id)}
            onClick={removeFromCart}
            className={classes.buttons}
          >
            Remove from Cart
          </Button>
          <Button className={classes.buttons} variant="outlined" color="primary" onClick={() => { handleOpen(); generateQRCode(); }}>
            View In Your Environment
            </Button>
          </p>
          <Modal
            open={open}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            {body}
          </Modal>
        </div>
      ) : null}
      {loading ? <h1>Loading...</h1> : null}
      
    </>
  );
}


export default Detail;
