import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
// import spinner from '../../assets/spinner.gif';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { Grid } from '@material-ui/core';
import CategoryMenu from '../CategoryMenu';


function ProductList() {
  // execute useStoreContext to retrieve global state object and dispatch to update
  const [state, dispatch] = useStoreContext();
  // destructure currentCategory out of the state object to use it in filterproducts func
  const { currentCategory } = state;
  // useEffect hook to wait for our useQuery to come in
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    // once useQuery data comes in, it goes from undefined to having value
    if (data) {
      // instruct reducer that it's the UPDATE_PRODUCTS action
      // should have an array of product data to our global store
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });

      // take each product and save it to IDB using helper
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      // offline - get all data from products store
      idbPromise('products', 'get').then((products) => {
        // set global state with retrieved data for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products
        });
      })
        .catch((error) => {
          console.error(error);
        });
    }
    // useStoreContext() executes again giving us the product data needed to display products on the page
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(product => product.category._id === currentCategory);
  }

  return (
    <Grid>
    <div className="my-2">
      <h2 id='feed-title'>Our Products:</h2>
      <CategoryMenu />
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              modelImage={product.modelImage}
              thumbnail={product.thumbnail}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <h1>Loading...</h1> : null}
    </div>
    </Grid>
  );
}

export default ProductList;
