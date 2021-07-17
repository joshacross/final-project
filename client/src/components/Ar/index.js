import { AFrameRenderer, Marker } from 'react-web-ar';
import React from 'react';
import { useParams } from 'react-router-dom';

// ultimately, I want to have one component that has temporal literals that dynamically change the id based on the QR code.

// going to have to use a query to grab ID and insert, because you cannot use
// temporal literals in imports

// also received this error:
// aframe-ar.js:3379 Uncaught TypeError: Cannot read property 'projectionMatrix' of null
//     at ARjs.Source.THREEx.ArToolkitSource.ARjs.Source.onResize (aframe-ar.js:3379)

function Ar () {
  const { id } = useParams();
  const objID = `${id}-obj`
  const mtlID = `${id}-mtl`

    return (
      <AFrameRenderer arToolKit={{ sourceType: 'webcam' }} >
        <Marker parameters={{ preset: 'hiro' }}>
          <a-scene>
          <a-assets>
            <a-assets-item id={objID} src="./assets/60f225322ff0629053973ccc/60f225322ff0629053973ccc.obj"></a-assets-item>
            <a-assets-item id={mtlID} src="./assets/60f225322ff0629053973ccc/60f225322ff0629053973ccc.obj"></a-assets-item>
          </a-assets>
          
          <a-entity obj-model="obj: #{objID}; mtl: #{mtlID}"></a-entity>
          </a-scene>
        </Marker>
      </AFrameRenderer>
    );
}

export default Ar;