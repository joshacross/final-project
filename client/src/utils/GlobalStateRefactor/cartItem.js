import React, { useState, createContext } from 'react';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../actions';
import { idbPromise } from '../helpers';

export const CartItemContext = createContext;

export function CartItemProvider({ product }) {
  // initial state is false to removefromcart
  const [RemoveFromCart, setRemoveFromCart] = useState(false);
  // initial state is 1 when updating quantity
  const [UpdateCartQuantity, setUpdateCartQuantity] = useState(1);

// expects product component as a prop and will use that object's properties to populate JSX

  // how previous code was setup - replaced all dispatch with sets
  // const [ , dispatch] = useState(false);

  const RemoveFromCart = product => {
    setRemoveFromCart({
      type: REMOVE_FROM_CART,
      _id: product._id
    });
    idbPromise('cart', 'delete', { ...product });
  };
  // allow users to manually edit the quantity of shopping cart products
  // anytime an <input> element's value changes, an onChange event will occur
  // capture that event and send the element's new value to the reducer
  const onChange = (e) => {
    const value = e.target.value;
  
    if (value === '0') {
      setRemoveFromCart({
        type: REMOVE_FROM_CART,
        _id: product._id
      });

      idbPromise('cart', 'delete', { ...product });
    } else {
      // below is wrong, I think it's UpdateCartQuantity = () => {setUpdateCartQuantity({...})}
      UpdateCartQuantity = () => {
      setUpdateCartQuantity({
        type: UPDATE_CART_QUANTITY,
        _id: product._id,
        purchaseQuantity: parseInt(value)
      });
    }
      idbPromise('cart', 'put', { ...product, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${product.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{product.name}, ${product.price}</div>
          <div>
            <span>Qty:</span>
            <input
              type="number"
              placeholder="1"
              value={product.purchaseQuantity}
              onChange={onChange}
            />
            <span
              role="img"
              aria-label="trash"
              onClick={() => RemoveFromCart(product)}
            >
              🗑️
            </span>
          </div>
        </div>
      </div>
    );
  }