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