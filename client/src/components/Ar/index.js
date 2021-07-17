

// import React from 'react';
// import { useParams } from 'react-router-dom';
// const { id } = useParams();
// import arObjImage from "`./assets/${id}/obj-${id}.png`";
// import arMtlImage from "`./assets/${id}/mtl-${id}.png`";
// import { AFrameRenderer, Marker } from 'react-web-ar';

// function Ar () {
//   const objID = `${id}-obj`
//   const mtlID = `${id}-mtl`

//     return (
//       <AFrameRenderer arToolKit={{ sourceType: 'webcam' }} >
//         <Marker parameters={{ preset: 'hiro' }}>
//           <a-assets>
//             <a-assets-item id={objID} src={arObjImage}></a-assets-item>
//             <a-assets-item id={mtlID} src={arMtlImage}></a-assets-item>
//           </a-assets>
//           <a-entity obj-model="obj: #{objID}; mtl: #{mtlID}"></a-entity>
//         </Marker>
//       </AFrameRenderer>
//     );
// }

// export default Ar;



import React from 'react';
// import { AFrameRenderer, Marker } from 'react-web-ar';
// import arObjImage from "./assets/60f225322ff0629053973ccc/60f225322ff0629053973ccc.obj";
// import arMtlImage from "./assets/60f225322ff0629053973ccc/60f225322ff0629053973ccc.mtl";
// import { 
//   ObjectLoader, 
//   MaterialLoader, 
//   arToolkitSource, 
//   arToolkitContext, 
//   artoolkitcontrols, 
//   ArMarkerControls, 
//   arbasecontrols 
// } from 'three';
<a-scene
  ...
  xrextras-pwa-installer
  xrweb></a-scene>

function Ar () {

    return (
      <a-scene
        xrextras-gesture-detector
        xrextras-almost-there
        xrextras-loading
        xrextras-runtime-error
        xrextras-pwa-installer
        renderer="colorManagement: true"
        xrweb>
      
        <a-assets>
          <a-asset-item id="toyModel" src="assets/toy.glb"></a-asset-item>
        </a-assets>
      
        <a-camera
          id="camera"
          position="0 8 8"
          raycaster="objects: .cantap"
          cursor="fuse: false; rayOrigin: mouse;">
        </a-camera>
      
        <a-entity
          light="
            type: directional;
            intensity: 0.8;
            castShadow: true;
            shadowMapHeight:2048;
            shadowMapWidth:2048;
            shadowCameraTop: 10;
            target: #model;"
          xrextras-attach="target: model; offset: 1 15 3;"
          shadow>
        </a-entity>
      
        <a-light type="ambient" intensity="0.7"></a-light>
      
        <a-entity 
          id="model" 
          gltf-model="#toyModel" 
          class="cantap" 
          xrextras-hold-drag 
          xrextras-two-finger-rotate 
          xrextras-pinch-scale 
          scale="1 1 1" 
          shadow="receive: false">
        </a-entity>
      
        <a-plane
          id="ground" 
          rotation="-90 0 0" 
          width="1000" 
          height="1000" 
          material="shader: shadow" 
          shadow>
        </a-plane>
      </a-scene>
    );
}

export default Ar;





// var scene, camera, renderer, clock, deltaTime, totalTime;

// var arToolkitSource, arToolkitContext;

// var markerRoot1;

// var mesh1;

// initialize();
// animate();

// function initialize()
// {
// 	scene = new THREE.Scene();

// 	let ambientLight = new THREE.AmbientLight( 0xcccccc, 1.0 );
// 	scene.add( ambientLight );
				
// 	camera = new THREE.Camera();
// 	scene.add(camera);

// 	renderer = new THREE.WebGLRenderer({
// 		antialias : true,
// 		alpha: true
// 	});
// 	renderer.setClearColor(new THREE.Color('lightgrey'), 0)
// 	renderer.setSize( 640, 480 );
// 	renderer.domElement.style.position = 'absolute'
// 	renderer.domElement.style.top = '0px'
// 	renderer.domElement.style.left = '0px'
// 	document.body.appendChild( renderer.domElement );

// 	clock = new THREE.Clock();
// 	deltaTime = 0;
// 	totalTime = 0;
	
// 	////////////////////////////////////////////////////////////
// 	// setup arToolkitSource
// 	////////////////////////////////////////////////////////////

// 	arToolkitSource = new THREEx.ArToolkitSource({
// 		sourceType : 'webcam',
// 	});

// 	function onResize()
// 	{
// 		arToolkitSource.onResize()	
// 		arToolkitSource.copySizeTo(renderer.domElement)	
// 		if ( arToolkitContext.arController !== null )
// 		{
// 			arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)	
// 		}	
// 	}

// 	arToolkitSource.init(function onReady(){
// 		onResize()
// 	});
	
// 	// handle resize event
// 	window.addEventListener('resize', function(){
// 		onResize()
// 	});
	
// 	////////////////////////////////////////////////////////////
// 	// setup arToolkitContext
// 	////////////////////////////////////////////////////////////	

// 	// create atToolkitContext
// 	arToolkitContext = new THREEx.ArToolkitContext({
// 		cameraParametersUrl: 'data/camera_para.dat',
// 		detectionMode: 'mono'
// 	});
	
// 	// copy projection matrix to camera when initialization complete
// 	arToolkitContext.init( function onCompleted(){
// 		camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
// 	});

// 	////////////////////////////////////////////////////////////
// 	// setup markerRoots
// 	////////////////////////////////////////////////////////////

// 	// build markerControls
// 	markerRoot1 = new THREE.Group();
// 	scene.add(markerRoot1);
// 	let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
// 		type: 'pattern', patternUrl: "data/hiro.patt",
// 	})

// 	let geometry1 = new THREE.PlaneBufferGeometry(1,1, 4,4);
// 	let loader = new THREE.TextureLoader();
// 	// let texture = loader.load( 'images/earth.jpg', render );
// 	let material1 = new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: 0.5 } );
// 	mesh1 = new THREE.Mesh( geometry1, material1 );
// 	mesh1.rotation.x = -Math.PI/2;
// 	markerRoot1.add( mesh1 );
	
// 	function onProgress(xhr) { console.log( (xhr.loaded / xhr.total * 100) + '% loaded' ); }
// 	function onError(xhr) { console.log( 'An error happened' ); }
	
// 	new THREE.MTLLoader()
// 		.setPath( 'models/' )
// 		.load( 'fish-2.mtl', function ( materials ) {
// 			materials.preload();
// 			new THREE.OBJLoader()
// 				.setMaterials( materials )
// 				.setPath( 'models/' )
// 				.load( 'fish-2.obj', function ( group ) {
// 					mesh0 = group.children[0];
// 					mesh0.material.side = THREE.DoubleSide;
// 					mesh0.position.y = 0.25;
// 					mesh0.scale.set(0.25,0.25,0.25);
// 					markerRoot1.add(mesh0);
// 				}, onProgress, onError );
// 		});
// }


// function update()
// {
// 	// update artoolkit on every frame
// 	if ( arToolkitSource.ready !== false )
// 		arToolkitContext.update( arToolkitSource.domElement );
// }


// function render()
// {
// 	renderer.render( scene, camera );
// }


// function animate()
// {
// 	requestAnimationFrame(animate);
// 	deltaTime = clock.getDelta();
// 	totalTime += deltaTime;
// 	update();
// 	render();
// }

