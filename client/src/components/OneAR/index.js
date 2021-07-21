import React, { useState, useEffect } from 'react';
import { AFrameRenderer, Marker } from 'react-web-ar';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PRODUCTS } from '../../utils/queries';
import {
  UPDATE_PRODUCTS
} from '../../utils/actions';
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from '../../utils/helpers';
// you have to import name of product and set it equal to import 


function OneAR () {
  const [state, dispatch] = useStoreContext();

  const { id } = useParams();

  console.log(id);

  const [currentProduct, setCurrentProduct] = useState({})

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products } = state;

  useEffect(() => {
  // already in global store
  if (products.length) {
    setCurrentProduct(products.find(product => product._id === id));
  } 
  // retrieved from server
  else if (data) {
    dispatch({
      type: UPDATE_PRODUCTS,
      products: data.products
    });

    data.products.forEach((product) => {
      idbPromise('products', 'put', product);
    });
  }
  // get cache from idb
  else if (!loading) {
    idbPromise('products', 'get').then((indexedProducts) => {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: indexedProducts
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  }, [products, data, loading, dispatch, id]);

  

  return (
    <>
      
      {currentProduct ? 
        (<AFrameRenderer arToolKit={{ sourceType: 'webcam' }} >
        <Marker parameters={{ preset: 'hiro' }}>

          <a-assets-item img id="AR" src={`/images/${currentProduct.thumbnail}`} alt={currentProduct.name} />

          <a-sphere src="#AR" radius="1" segments-height="53">
            <a-animation
              attribute="rotation"
              dur="3000"
              from="1 -90 90"
              to="360 -90 90"
              easing="linear"
              repeat="indefinite" />
          </a-sphere>

        </Marker>
      </AFrameRenderer>): <h4>Still Loading...</h4>}
      </>
    );
}

export default OneAR;
