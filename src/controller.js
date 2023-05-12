import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { walls } from './House';
import { Paves } from './Pave';


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0b1c);
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
			
			const renderer = new THREE.WebGLRenderer({alpha:true});
			renderer.setSize( 
                window.innerWidth, 
                window.innerHeight 
                );
            
            renderer.shadowMap.type = THREE.ACESFilmicToneMapping;
               
			document.body.appendChild( renderer.domElement );

           
            //Light
            const dl = new THREE.DirectionalLight(0xffffff, 1);
            dl.castShadow = true;
            dl.shadow.mapSize.width = 10;
            dl.shadow.mapSize.height = 10;
            dl.shadow.camera.near = 0.5;
            dl.shadow.camera.far = 20;
            dl.position.set(0, 1, 1).normalize();
            scene.add(dl);
            // add AmbientLight
            const light = new THREE.AmbientLight(0xffffff);
            light.intensity = 0.4;
            scene.add(light);
            
            //Toilet
            const cubeGeometry = new THREE.BoxGeometry(0.8, 0.7, 1.2);
            const cubeMaterial = new THREE.MeshPhongMaterial({ color: 'grey'});
            const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cubeMesh.position.set(-1, 0.63, -4);
            
            scene.add(cubeMesh);

            //Ceptic    
            const cube = new THREE.BoxGeometry(1.4, 0.1, 1);
            const Material = new THREE.MeshPhongMaterial({ color: 'grey'});
            const Mesh = new THREE.Mesh(cube, Material);
            Mesh.position.set(4, 0.07, -4.3);
            scene.add(Mesh);

            //Just another object    
            const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
            const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x544d46 });
            const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphereMesh.position.set(-4, 0.5, -4);
            scene.add(sphereMesh);
            
            //Outside Tank
            const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 16);
            const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0x242440 });
            const ShadowMaterial = new THREE.ShadowMaterial();
            const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial,ShadowMaterial);
            cylinderMesh.position.set(-6, 0.5, 4);
            scene.add(cylinderMesh);

             
            //Ground Plane
            const PlaneGeometry = new THREE.PlaneGeometry( 12, 12,1 );
            cubeGeometry.rotateX( - Math.PI / 2 );

            cubeMaterial.opacity = 0.2;
           
            const PlaneMaterial = new THREE.MeshPhongMaterial( {color: 0x1c1c1f, side: THREE.DoubleSide} );

            const plane = new THREE.Mesh( PlaneGeometry, PlaneMaterial );
            plane.position.y = 0;
            plane.receiveShadow = true;
            plane.rotation.x = Math.PI / 2;
            scene.add( plane );
            
            //Green Grass ground 
            const Ground = new THREE.BoxGeometry(10, 0.05, 10);
            const GMaterial = new THREE.MeshPhongMaterial({ color: 0x0c5409});
            const GMesh = new THREE.Mesh(Ground, GMaterial);

            GMesh.position.set(0, 0.01, 0);
            
            GMesh.receiveShadow = true;
            scene.add(GMesh);

           cubeMesh.translateX(5);
           cylinderMesh.translateX(2);

           const geometry = new THREE.ConeGeometry( 8.5, 3, 4 ); 
           const material = new THREE.MeshBasicMaterial( {color: 0x40270a} );
           const cone = new THREE.Mesh(geometry, material ); 
           cone.rotation.x = Math.PI;
           cone.rotation.y = 2.3575;
           cone.position.y =-1.51;
           scene.add( cone );


           //Add lighting to the scene
            var light2 = new THREE.AmbientLight(0xffffff, 0.5);
            light2.intensity = 0.4;
            scene.add(light2);
            light2.castShadow = true;
            var d2 = new THREE.DirectionalLight(0xffffff, 0.5);
            d2.position.set(0, 1, 1).normalize();
            scene.add(d2);
            d2.castShadow = true;
            d2.shadow.mapSize.width = 500;
            d2.shadow.mapSize.height = 500;
            d2.shadow.camera.near = 0.5;
            d2.shadow.camera.far = 500;


            cubeGeometry.castShadow = true;
            plane.receiveShadow = true;
    
			camera.position.z = 10;

            //The following code controls the first person navigation
            const controls = new PointerLockControls(camera, document.body);
            scene.add(controls.getObject());

              const onKeyArrows = function (event) {
                switch (event.keyCode) {
                  case 38: // // Key-UP Arrow Button
                    controls.moveForward(1);
                    break;
                  case 40: // // Key-DOWN Arrow Button
                    controls.moveForward(-1);
                    break;
                  case 37: // // Key-RIGHT Arrow Button
                    controls.moveRight(-1);
                    break;
                  case 39: // // Key-LEFT Arrow Button
                    controls.moveRight(1);
                    break;
                }
              };
              
            document.addEventListener("keydown", onKeyArrows);

            document.addEventListener("click", function () {
                controls.lock();
              }); 

            //Enebles the views from the user
			const OBcontrols = new OrbitControls( camera, renderer.domElement );
			OBcontrols.update();

            camera.lookAt(plane.position)

			function animate() {
				requestAnimationFrame( animate );
				
				renderer.render( scene, camera );
			}
           
			animate();
            scene.add(walls());//Fectching the House to the scene
            scene.add(Paves());//Fectching the Paves to the scene



