import { useProductReducer } from './reducers'

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