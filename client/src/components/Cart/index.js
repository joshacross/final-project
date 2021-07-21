import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client'
import { IconButton } from '@material-ui/core';
import ShoppingCart from '@material-ui/icons/ShoppingCartOutlined'
const stripePromise = loadStripe(process.env.STRIPE_URI1);


const Cart = () => {
  // useStoreContext Hook to establish a state variable and the dispatch to update the state
  const [state, dispatch] = useStoreContext();

  // data variable will contain checkout session only after query is called with getCheckout
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      // array of items returning from IDB = dispatch ADD_MULTI...
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [ ...cart ] });
    };
    // if there are no items in cart, then exec getCart() from cart obj store
    if (!state.cart.length) {
      getCart();
    }
    // pass state.cart.length into useEffect dependency array
  }, [state.cart.length, dispatch]);

  // dispatch() calls TOGGLE_CART action
  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      })
      .catch((error) => {
        console.error(error);
      });
    }

  }, [data]);

  function submitCheckout() {
    const productIds = [];
  
    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds }
    });
  }

    // if the state of the cart is not open
    if (!state.cartOpen) {
      return (
        <div onClick={toggleCart}>
            <IconButton color="inherit"><ShoppingCart /></ IconButton>
        </div>
      );
    }


  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>[close]</div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map(item => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {
              Auth.loggedIn() ?
                <button onClick={submitCheckout}>
                  Checkout
                </button>
                :
                <span>(log in to check out)</span>
            }
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
)};

export default Cart;