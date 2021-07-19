import React, { useState, useEffect, useContext, createContext } from 'react';
import { CartItem } from './CartItem'; // <-- refactor {}
import Auth from '../auth';
import './style.css'; // <-- import Materialize scripts for login
import { CartItemProvider } from './state';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../actions';
import { idbPromise } from '../helpers';
import { QUERY_CHECKOUT } from '../queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client'

export const CartContext = createContext;

export function CartProvider(props) {
  // useContext Hook to establish a state variable and the dispatch to update the state
  const [CartOpen, setCartOpen] = useState(false);
  // empty array to handle items in cart
  const [CartItems, setCartItems] = useState([]);
  // data variable will contain checkout session only after query is called with getCheckout
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  // destructure item {} from CartItemProvider
  const { CartItem } = useContext(CartItemProvider);

  // stripe key --> should be in a .env file
  const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      // array of items returning from IDB = setCartItems ADD_MULTI...
      setCartItems({ type: ADD_MULTIPLE_TO_CART, products: [ ...cart ] });
    };
    // if there are no items in cart, then exec getCart() from cart obj store
    if (!CartItems.length) {
      getCart();
    }
    // pass cartItems length into useEffect dependency array above^
  }, [CartItems.length, setCartItems]);

  // setCartOpen calls TOGGLE_CART action
  function toggleCart() {
    setCartOpen({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    // sum all values by price and qty
    CartItems.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    });
    // i'm not sure what 2 is, but leaving it in there bc it works
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
              // import cart item from CartItemProvider
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
