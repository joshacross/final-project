import React from 'react';
import { AFrameRenderer, Marker } from 'react-web-ar';
import { productComponent } from 'react-router-dom';

// you have to import name of product and set it equal to import 


function HatTwo () {
    return (
      <AFrameRenderer arToolKit={{ sourceType: 'webcam' }} >
        <Marker parameters={{ preset: 'hiro' }}>

          <a-assets-item img id="hatTwo" src={hatTwo} />

          <a-sphere src="#hatTwo" radius="1" segments-height="53">
            <a-animation
              attribute="rotation"
              dur="3000"
              from="1 -90 90"
              to="360 -90 90"
              easing="linear"
              repeat="indefinite" />
          </a-sphere>

        </Marker>
      </AFrameRenderer>
    );
}


export default HatTwo;
