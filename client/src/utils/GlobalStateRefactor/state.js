import React from 'react';
import { Cart } from './cart';
import { CartItem } from './cartItem';
import { Login } from './login';
import { QRPopup } from './qrpopup';
import { Product } from './product';
import { Alert } from './alert';

// context providers providerComposer function to take in all providers, and hide them from view
// so you dont have to have a super nested tree of providers
function ProviderComposer({ contexts, children }) {
    return contexts.reduceRight(
        (kids, parent) =>
        React.cloneElement(parent, {
            children: kids,
        }),
        children
    );
}

function ContextProvider({ children }) {
    return (
        <ProviderComposer
            contexts={[<CartProvider />, <CartItemProvider />, <QRPopupProvider />, <LoginProvider />, <AlertProvider/>]}
            >
                {children}
            </ProviderComposer>
    );
}

export { ContextProvider };

// import React, { createContext, useContext } from "react";
// import { useProductReducer } from './reducers'

// const StoreContext = createContext();
// const { Provider } = StoreContext;

// const StoreProvider = ({ value = [], ...props }) => {
//   const [state, dispatch] = useProductReducer({
//     products: [],
//     cart: [],
//     cartOpen: false,
//     qrOpen: false,
//     categories: [],
//     currentCategory: ''
//   });

//   return <Provider value={[state, dispatch]} {...props} />;
// };

// const useStoreContext = () => {
//   return useContext(StoreContext);
// };

// export { StoreProvider, useStoreContext };

////////////////////////////////////////////////

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
