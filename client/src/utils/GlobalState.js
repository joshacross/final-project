import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    qrOpen: false,
    categories: [],
    currentCategory: ''
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };

// import React, { createContext, useContext } from 'react';
// import { useProductReducer } from './reducers';

// // empty container waiting for data to be provided to it as state
// const StoreContext = createContext();
// const { Provider } = StoreContext;

// // instantiate initial global state with the useProductReducer function 
// // useProductReducer wraps around the useReducer hook from React 
// // allows us to receive state and dispatch
// const StoreProvider = ({ value = [], ...props }) => {
//     const [state, dispatch] = useProductReducer({
//       products: [],
//       categories: [],
//       currentCategory: '',
//     });
//     // use this to confirm it works!
//     console.log(state);
//     return <Provider value={[state, dispatch]} {...props} />;
//   };

//   //notes: useProductReducer() completes and provides with new state and function to update state
//   // return StoreContext's <Provider> component with our state obj and dispatch the function
//   // provided as data for the value prop.

//   //StoreProvider is our own custom Provider Component^^ 

//   const useStoreContext = () => {
//     return useContext(StoreContext);
//   };

//   export { StoreProvider, useStoreContext };
