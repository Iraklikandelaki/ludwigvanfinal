let object2, frameArea, floor, light, mouseMesh;
let INTERSECTED, INTERSECTED2, mouse, cube;
// var mouse = {
// 	x: 0,
// 	y: 0
//   };
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 5, window.innerWidth/window.innerHeight, 1, 1000 );
scene.background = new THREE.Color( 0x000000 );
var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );


 raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

// document.addEventListener( 'mousemove', onDocumentMouseMove );
// document.addEventListener( 'click', onDocumentMouseClick );
document.addEventListener( 'mousemove', onMouseMove );



// floor = new THREE.BoxGeometry( 8, 3, 2 );
// const floormaterial = new THREE.MeshLambertMaterial( {color: 0x00ff00, transparent: true, opacity: 0.4} );
// const floorshape = new THREE.Mesh( floor, floormaterial );
// floorshape.position.set(-1, 10, 19)
// floorshape.userData = { URL: "./room1.html"};
// scene.add( floorshape );

const sphere = new THREE.SphereGeometry( 10, 10, 10 );
const boxgeometry = new THREE.BoxGeometry( 5, 5, 5 );
const boxmaterial = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
// cube = new THREE.Mesh( boxgeometry, boxmaterial );
// cube.position.set(0, 0, 0)
// scene.add( cube );

cube = new THREE.PointLight(0xe8effa, 2, 20);
  cube.position.set(0, 0, 0);
  scene.add(cube);


const boxgeometry2 = new THREE.BoxGeometry( 5, 5, 5 );
const boxmaterial2 = new THREE.MeshBasicMaterial( {color: 0x00ff00, transparent: true, opacity: 0} );
const cube2 = new THREE.Mesh( boxgeometry2, boxmaterial2 );
cube2.position.set(0, -33, 37)
scene.add( cube2 );

// const light = new THREE.AmbientLight( 0x404040, 3.5 ); // soft white light scene.add( light );
// scene.add( light );

// const light2 = new THREE.PointLight( 0xff0000, 1, 100 );
// light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xFBFBA2 } ) ) );	
// light2.position.set( -200, 50, 10 );
// scene.add( light2 );

// light = new THREE.PointLight(0xcee8ed);
//   light.position.set(200, 280, -10);
//   scene.add(light);
//   var lightAmb = new THREE.AmbientLight(0x000000);
//   scene.add(lightAmb);

  // Define the lights for the scene
//   light = new THREE.PointLight(0xff00ff, 1, 3000);
//   light.position.set(0, 0, 15);
//   scene.add(light);
//   var lightAmb = new THREE.AmbientLight(0xff00ff);
//   scene.add(lightAmb);


    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load('./scene.gltf', (gltf) => {
      const root = gltf.scene;
	//   root.scale.set(2, 2, 2) // scale here
	  root.position.set(0, 0, 0)
	 
      scene.add(root);
	  

      // compute the box that contains all the stuff
      // from root and below
      const box = new THREE.Box3().setFromObject(root);

      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      // set the camera to frame the box
    //   frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

      // update the Trackball controls to handle the new size
      controls.maxDistance = boxSize * 10;
      controls.target.copy(boxCenter);
	  controls.enableDamping = true;
	  controls.minPolarAngle = 0; // radians
		controls.maxPolarAngle = Math.PI / 2; // radians
	  controls.dampingFactor = 0.6;
      controls.update();
    });
  

 // Create a circle around the mouse and move it
	// The sphere has opacity 0
	const listener = new THREE.AudioListener();
	camera.add( listener );
	
	// create a global audio source
	const sound = new THREE.Audio( listener );
	
	// load a sound and set it as the Audio object's buffer
	const audioLoader = new THREE.AudioLoader();
	audioLoader.load( './sonata.mp3', function( buffer ) {
		sound.setBuffer( buffer );
		sound.setLoop( true );
		sound.setVolume( 0.5 );
		sound.play();
	});


	// var mouseGeometry = new THREE.SphereGeometry(1, 0, 0);
	// var mouseMaterial = new THREE.MeshBasicMaterial({
	// 	color: 0x0000ff
	// });
	// mouseMesh = new THREE.Mesh(mouseGeometry, mouseMaterial);
	// // mouseMesh = new THREE.PointLight(0xff00ff, 1, 700);
	// mouseMesh.position.z = -5;
	
	// scene.add(mouseMesh);

	// // When the mouse moves, call the given function
	// document.addEventListener('mousemove', onMouseMove, false);


// // Follows the mouse event
// function onMouseMove(event) {

// 	// Update the mouse variable
// 	event.preventDefault();
// 	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
// 	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

//  // Make the sphere follow the mouse
//   var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
// 	vector.unproject( camera );
// 	var dir = vector.sub( camera.position ).normalize();
// 	var distance = - camera.position.z / dir.z;
// 	var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
// 	mouseMesh.position.copy(pos);
  
// 	// Make the sphere follow the mouse
// //	mouseMesh.position.set(event.clientX, event.clientY, 0);
// };

  // When the mouse moves, call the given function
//   document.addEventListener('mousemove', onMouseMove, false);

	
	// Follows the mouse event
// function onMouseMove(event) {

//   // Update the mouse variable
//   event.preventDefault();
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//   // Make the sphere follow the mouse
//   var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
//   vector.unproject(camera);
//   var dir = vector.sub(camera.position).normalize();
//   var distance = -camera.position.z / dir.z;
//   var pos = camera.position.clone().add(dir.multiplyScalar(distance));
//   //mouseMesh.position.copy(pos);

//   light.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z + 2));
//   };

function onMouseMove( event ) {

	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );

	// See if the ray from the camera into the world hits one of our meshes
	const intersects = raycaster.intersectObject( cube2 );

	// Toggle rotation bool for meshes that we clicked
	if ( intersects.length > 0 ) {

		cube.position.set( 0, 0, 0 );
		cube.lookAt( intersects[ 0 ].face.normal );

		cube.position.copy( intersects[ 0 ].point );

	}

}


	function onDocumentMouseMove( event ) {

		event.preventDefault();

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	}

	// function onDocumentMouseClick( event ) {

	// 	event.preventDefault();

	// 	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	// 	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


	// 	const intersects2 = raycaster.intersectObjects( scene.children );

	// if ( intersects2.length > 0 ) {

	// 	if ( INTERSECTED2 != intersects2[ 0 ].object ) {

		
	// 			window.location.href = (intersects2[0].object.userData.URL);
		
			


	// 		// camera.position.z -= 5;
			

	// 	}
	// }


	// }


	



const controls = new THREE.OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
// camera.position.set( 450, 20, 1240 );
camera.position.set( 450, 20, 1240 );
camera.updateMatrixWorld();
controls.enablePan = false;
controls.update();
// document.addEventListener('mousemove', light_update );

var animate = function () {
	requestAnimationFrame( animate );

	

	// raycaster.setFromCamera( mouse, camera );

	// const intersects = raycaster.intersectObjects( scene.children );

	// if ( intersects.length > 0 ) {

	// 	if ( INTERSECTED != intersects[ 0 ].object ) {

	// 		if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

	// 		INTERSECTED = intersects[ 0 ].object;
	// 		INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
	// 		INTERSECTED.material.emissive.setHex( 0xff0000 );
	// 		// controls.target = INTERSECTED;

			
	// 		// camera.position.z -= 5;
	// 		gsap.to( camera, {
	// 			duration: 2,
	// 			zoom: 2,
	// 			onUpdate: function () {
				
	// 				camera.updateProjectionMatrix();
				
	// 			}
	// 		} );

	// 	}

	// } else {

	// 	if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
	// 	// camera.position.z -= 0.1;
	// 	INTERSECTED = null;
	// 	gsap.to( camera, {
	// 		duration: 2,
	// 		zoom: 1,
	// 		onUpdate: function () {
			
	// 			camera.updateProjectionMatrix();
			
	// 		}
	// 	} );

	// }

	
	controls.update();

	
  // Create a circle around the mouse and move it
  // The sphere has opacity 0
 


	renderer.render(scene, camera);
};



  // When the mouse moves, call the given function




animate();