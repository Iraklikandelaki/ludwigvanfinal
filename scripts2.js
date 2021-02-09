var example1 = function(){
	let object2, frameArea, floor, light, mouseMesh;
	let INTERSECTED, INTERSECTED2, mouse, cube, raycaster, amblight;
	let views = [];
	// var mouse = {
	// 	x: 0,
	// 	y: 0
	//   };
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 5, window.innerWidth/window.innerHeight, 1, 1000 );
	var drawingSurface = document.getElementById( 'canvas2' );
	scene.background = new THREE.Color( 0x000000 );
	var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: drawingSurface});
	
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( 1350, 700 )
	
	// renderer.setSize( window.innerWidth, window.innerHeight );
	// document.body.appendChild( renderer.domElement );
	
	amblight = new THREE.AmbientLight( 0xF3F3F3, 0 ); // soft white light
	scene.add( amblight );
	
	
	 raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	
	
	document.addEventListener( 'mousemove', onMouseMove );
	
	
	
	
	const sphere = new THREE.SphereGeometry( 10, 10, 10 );
	const boxgeometry = new THREE.BoxGeometry( 5, 5, 5 );
	const boxmaterial = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
	
	
	cube = new THREE.PointLight(0xe8effa, 6, 300);
	  cube.position.set(0, 0, 0);
	  scene.add(cube);
	
	
	const boxgeometry2 = new THREE.BoxGeometry( 10, 20, 8 );
	const boxmaterial2 = new THREE.MeshLambertMaterial( {color: 0x00ff00, transparent: true, opacity: 0} );
	const cube2 = new THREE.Mesh( boxgeometry2, boxmaterial2 );
	cube2.position.set(0, -2, 14)
	scene.add( cube2 );
	
	
	
	
		const gltfLoader = new THREE.GLTFLoader();
		gltfLoader.load('./ludwig2/scene.gltf', (gltf) => {
		  const root = gltf.scene;
		//   root.scale.set(2, 2, 2) // scale here
		  root.position.set(0, 0, 0)
		 
		  scene.add(root);
		  
	
		  // compute the box that contains all the stuff
		  // from root and below
		  const box = new THREE.Box3().setFromObject(root);
	
		  const boxSize = box.getSize(new THREE.Vector3()).length();
		  const boxCenter = box.getCenter(new THREE.Vector3());
	
	
		  controls.maxDistance = boxSize * 10;
		  controls.target.copy(boxCenter);
		  controls.enableDamping = true;
		  controls.minPolarAngle = 0; // radians
			controls.maxPolarAngle = Math.PI / 2; // radians
		  controls.dampingFactor = 0.6;
		  controls.update();
		});
	  
	
	
	
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
	
		
	
	
	
		function clickToLink(){
			console.log("clicked")
			gsap.to( amblight, {
				duration: 4,
				intensity: 4,
				
			} );
			gsap.to( camera.position, {
				duration: 2,
				y: -30,
				z: 12,
				onUpdate: function () {
				
					camera.updateProjectionMatrix();
					
				}
			} );
		}
	document.querySelector(".deafness").addEventListener("click", clickToLink );
	
	
	
	const controls = new THREE.OrbitControls( camera, renderer.domElement );
	
	//controls.update() must be called after any manual changes to the camera's transform
	// camera.position.set( 450, 20, 1240 );
	camera.position.set( 450, 20, 1240 );
	camera.updateMatrixWorld();
	controls.enablePan = false;
	controls.enableZoom = false;
	controls.update();
	// document.addEventListener('mousemove', light_update );
	
	var animate = function () {
		requestAnimationFrame( animate );
	
		
	
		
	
		
		controls.update();
	
		
	  // Create a circle around the mouse and move it
	  // The sphere has opacity 0
	 
	
	
		renderer.render(scene, camera);
	};
	
	
	
	  // When the mouse moves, call the given function
	
	
	
	
	animate();
}

example1();