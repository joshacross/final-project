import React, { useState, useEffect, createContext } from 'react';
import { CartItem } from './CartItem'; // <-- refactor {}
import Auth from '../../utils/auth';
import './style.css';
import { CartProvider, CartItemProvider } from './state';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client'

export const CartContext = createContext;

export function CartProvider(props) {
  // useContext Hook to establish a state variable and the dispatch to update the state
  const [CartOpen, setCartOpen] = useState(false);
  // empty array to handle items in cart
  const [CartItems, setCartItems] = ([]);
  // data variable will contain checkout session only after query is called with getCheckout
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);



  // stripe key --> should be in a .env file
  const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      // array of items returning from IDB = dispatch ADD_MULTI...
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [ ...cart ] });
    };
    // if there are no items in cart, then exec getCart() from cart obj store
    if (!CartItems.length) {
      getCart();
    }
    // pass state.cart.length into useEffect dependency array
  }, [CartItems.length, setCartItems]);

  // dispatch() calls TOGGLE_CART action
  function toggleCart() {
    setCartOpen({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    CartItems.forEach(item => {
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
  
    CartItems.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds }
    });
  }

    // if the state of the cart is not open
    if (!CartOpen) {
      return (
        <div className="cart-closed" onClick={toggleCart}>
          <span
            role="img"
            aria-label="trash">🛒</span>
        </div>
      );
    }

    return (
      <div className="cart">
        <div className="close" onClick={toggleCart}>[close]</div>
        <h2>Shopping Cart</h2>
        {CartItems.length ? (
          <div>
            {CartItems.map(item => (
              // import cart item from ./cartitem
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
  )
}
