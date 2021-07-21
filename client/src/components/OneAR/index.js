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
        { currentProduct !== {} ? (
        <AFrameRenderer arToolKit={{ sourceType: 'webcam' }} >
          <Marker parameters={{ preset: 'hiro' }}>

              {currentProduct.thumbnail === undefined ? (
                <a-assets-item img id="AR" src="/images/error.jpg" alt={currentProduct.name} />
              ) : (currentProduct.thumbnail === 'hatone.jpeg' ? (
                <a-assets-item img id="AR" src="/images/hatone.jpeg" alt={currentProduct.name} />
              ) : (currentProduct.thumbnail === 'hattwo.jpeg' ? (
                <a-assets-item img id="AR" src="/images/hattwo.jpeg" alt={currentProduct.name} />
              ) : (currentProduct.thumbnail === 'hatthree.jpeg' ? (
              <a-assets-item img id="AR" src="/images/hatthree.jpeg" alt={currentProduct.name} />
              ) : (currentProduct.thumbnail === 'hatfour.jpeg' ? (
              <a-assets-item img id="AR" src="/images/hatfour.jpeg" alt={currentProduct.name} />
              ) : (currentProduct.thumbnail === 'sunone.jpeg' ? (
              <a-assets-item img id="AR" src="/images/sunone.jpeg" alt={currentProduct.name} />
              ) : (currentProduct.thumbnail === 'suntwo.jpeg' ? (
              <a-assets-item img id="AR" src="/images/suntwo.jpeg" alt={currentProduct.name} />
              ) : (currentProduct.thumbnail === 'sunthree.jpeg' ? (
              <a-assets-item img id="AR" src="/images/sunthree.jpeg" alt={currentProduct.name} />
              ) : (currentProduct.thumbnail === 'sunfour.jpeg' ? (
              <a-assets-item img id="AR" src="/images/sunfour.jpeg" alt={currentProduct.name} />
              ) : (currentProduct.thumbnail === 'watchone.jpeg' ? (
              <a-assets-item img id="AR" src="/images/watchone.jpeg" alt={currentProduct.name} />
              ) : (currentProduct.thumbnail === 'watchtwo.jpeg' ? (
              <a-assets-item img id="AR" src="/images/watchtwo.jpeg" alt={currentProduct.name} />
              ) : (currentProduct.thumbnail === 'watchthree.jpeg' ? (
              <a-assets-item img id="AR" src="/images/watchthree.jpeg" alt={currentProduct.name} />
              ) : (currentProduct.thumbnail === 'watchfour.jpeg' ? (
              <a-assets-item img id="AR" src="/images/watchfour.jpeg" alt={currentProduct.name} />
                ) : <a-assets-item img id="AR" src="/images/error.jpg" alt={currentProduct.name} />
                ))))))))))))
              
              }
              
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
        </AFrameRenderer>) : (<h1>Loading...</h1>)
        }
    </>
    );

}

export default OneAR;
