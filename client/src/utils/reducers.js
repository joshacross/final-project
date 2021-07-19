import { useReducer } from "react";

import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
  TOGGLE_QR_POPUP
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      };
    
    case ADD_TO_CART:
      return {
        // state operator to preserve everything else on state
        ...state,
        // allows users to immediately view cart with newly added item
        cartOpen: true,
        // update cart property to add action.product
        cart: [...state.cart, action.product]
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

      case REMOVE_FROM_CART:
        // use filter() method to only keep items that do not match the provided _id property
        let newState = state.cart.filter(product => {
          return product._id !== action._id;
        });
      
        return {
          ...state,
          // check length of the array to set cartOpen to false when array is empty
          cartOpen: newState.length > 0,
          cart: newState
        };

        case UPDATE_CART_QUANTITY:
          return {
            ...state,
            cartOpen: true,
            // use map method to create a new array, bc og state is immutable
            cart: state.cart.map(product => {
              if (action._id === product._id) {
                product.purchaseQuantity = action.purchaseQuantity;
              }
              return product;
            })
          };
          // cart empty and closed after CLEAR_CART action is called
        case CLEAR_CART:
          return {
            ...state,
            cartOpen: false,
            cart: []
          };
        // cartOpen to be the opposite of its previous value each time TOGGLE_CART is called
        case TOGGLE_CART:
          return {
            ...state,
            cartOpen: !state.cartOpen
          };
          // QRtoggleOpen
          case TOGGLE_QR_POPUP:
            return {
              ...state,
              qrOpen: !state.qrOpen
            };

    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState)
}

// import { useReducer } from 'react';

// export const reducer = (state, action) => {
//     switch (action.type) {
//       // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
//       case UPDATE_PRODUCTS:
//         return {
//           ...state,
//           products: [...action.products]
//         };
//       // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
//       case UPDATE_CATEGORIES:
//         return {
//           ...state,
//           categories: [...action.categories]
//         };

//         case UPDATE_CURRENT_CATEGORY:
//             return {
//                 ...state,
//                 currentCategory: action.currentCategory
//             };
  
//       default:
//         return state;
//     }
//   };

//   export function useProductReducer(initialState) {
//     return useReducer(reducer, initialState);
//   }