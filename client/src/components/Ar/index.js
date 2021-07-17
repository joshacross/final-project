import React from 'react';
import { useParams } from 'react-router-dom';
const { id } = useParams();
import arObjImage from `./assets/${id}/obj-${id}.png`;
import arMtlImage from `./assets/${id}/mtl-${id}.png`;
import { AFrameRenderer, Marker } from 'react-web-ar';

function Ar () {
  const objID = `${id}-obj`
  const mtlID = `${id}-mtl`

    return (
      <AFrameRenderer arToolKit={{ sourceType: 'webcam' }} >
        <Marker parameters={{ preset: 'hiro' }}>
          <a-assets>
            <a-assets-item id={objID} src={arObjImage}></a-assets-item>
            <a-assets-item id={mtlID} src={arMtlImage}></a-assets-item>
          </a-assets>
          <a-entity obj-model="obj: #{objID}; mtl: #{mtlID}"></a-entity>
        </Marker>
      </AFrameRenderer>
    );
}

export default Ar;
