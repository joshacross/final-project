import 'aframe';
import React from 'react';
import { Box, Sphere, Cylinder, Plane, Sky, Text, Scene} from 'react-aframe-ar';

function Shapes () {
    return (
      <Scene>
        <Box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" shadow />
        <Sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" shadow />
        <Cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" shadow />
        <Plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" shadow />
        <Sky color="#ECECEC" />
        <Text value="Hello world, react-aframe-ar!" align="center" position="0 2.3 -1.5" color="#7BC8A4" />
      </Scene>
    );
}


export default Shapes;
