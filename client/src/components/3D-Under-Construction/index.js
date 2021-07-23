import React from 'react';
import { AFrameRenderer, Marker } from 'react-web-ar';
import threedee from './katana.glb';

function Threedee () {
    return (
      <AFrameRenderer arToolKit={{ sourceType: 'webcam' }} >
        <Marker parameters={{ preset: 'hiro' }}>

          <a-assets-item img id="threedeeImage" src={threedee} />

        <a-entity gltf-model={threedee} position="0 0 0" src="#threedeeImage" radius="10" segments-height="53" scale="10 10 10">
            <a-animation
              attribute="rotation"
              dur="10000"
              from="1 -90 90"
              to="360 -90 90"
              easing="linear"
              repeat="indefinite" />
          </a-entity>
          <a-entity ></a-entity>

        </Marker>
      </AFrameRenderer>
    );
}

export default Threedee;
