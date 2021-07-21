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
// import hatOne from './images/hatone.jpeg';
// import hatTwo from './images/hattwo.jpeg';
// import hatThree from './images/hatthree.jpeg';
// import image from './hattwo.jpeg'

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

// // var image =  "";
// console.log(data);
// console.log(`/images/${currentProduct.thumbnail}`);

// const image = `/images/${currentProduct.thumbnail}`
// // if there is undefined data , else render div with the word loading...
// // when we get data, render component


// Switch (`/images/${currentProduct}.thumbnail` = {
//   case "*/hatone.jpg":
//     renderImage();
//     break;
//   case {hatOne}:
//     renderImage();
//     break;
//   case "*/hatthree.jpg":
//     returnImage();
//     break;
// });



// renderImage() {
//   switch (img) {
//     case '*/hatone.jpg':
//     return (<Image source={require(`/images/${currentProduct.thumbnail}`)}/> );
//     case '*/hatone.jpg':
//     return (<Image source={require(`/images/${currentProduct.thumbnail}`)}/> );
//     case '*/hatone.jpg':
//     return (<Image source={require(`/images/${currentProduct.thumbnail}`)}/> );
//     case '*/hatone.jpg':
//       return (<Image source={require(`/images/${currentProduct.thumbnail}`)}/> );
//     // .. rest of the case
//     default:
//         return (
//             <Text>{'Null'}</Text>
//         );
//   }
// }

  // const img = `/images/${currentProduct.thumbnail}`
  

  const renderImage = () => {
    const value = currentProduct.thumbnail;
  switch (value) {
    case 'hatone.jpeg':
      return "/images/hatone.jpeg";
    case 'hattwo.jpeg':
      return "/images/hattwo.jpeg";
    case 'hatthree.jpeg':
      return "/images/hatthree.jpeg";
    case 'hatfour.jpeg':
      return "/images/hatfour.jpeg";
    case 'sunone.jpeg':
      return "/images/sunone.jpeg";
    case 'suntwo.jpeg':
      return "/images/suntwo.jpeg";
    case 'sunthree.jpeg':
      return "/images/sunthree.jpeg";
    case 'sunfour.jpeg':
      return "/images/sunfour.jpeg";
    case 'watchone.jpeg':
      return "/images/watchone.jpeg";
    case 'watchtwo.jpeg':
      return "/images/watchtwo.jpeg";
    case 'watchthree.jpeg':
      return "/images/watchthree.jpeg";
    case 'watchfour.jpeg':
      return "/images/watchfour.jpeg";
    default:
      return "/images/error.jpg";
  }
}





    return (

      <>
        { currentProduct !== {} ? (
        <AFrameRenderer arToolKit={{ sourceType: 'webcam' }} >
          <Marker parameters={{ preset: 'hiro' }}>

            <a-assets-item img id="AR" src={renderImage()} alt={currentProduct.name} />

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
