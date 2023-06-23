import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const objLoader = new GLTFLoader();

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
            
   
            //Ground Plane
            const PlaneGeometry = new THREE.PlaneGeometry( 15, 15, 2);
            
            const ground = textureLoader.load('./pavement.jpg')
            const PlaneMaterial = new THREE.MeshPhongMaterial( {color: 0x141617, side: THREE.DoubleSide} );

            const plane = new THREE.Mesh( PlaneGeometry, PlaneMaterial );
            plane.position.y = 0;
            plane.receiveShadow = true;
            plane.rotation.x = Math.PI / 2;
            scene.add( plane );

            //URLS FOR MODELS
            const houseURL = new URL('./house.glb', import.meta.url);
            const carURL = new URL('./free_porsche_911_carrera_4s.glb', import.meta.url);
            const manURL = new URL('./man.glb', import.meta.url);

            //LOADING HOUSE MODEL
            objLoader.load(houseURL.href, function (houseObject) {
              houseObject.scene.position.set(0, -0.05, -2);
              houseObject.scene.scale.set(0.6, 0.6, 0.6);
              scene.add(houseObject.scene);
            }, undefined, function (error) {
              console.error(error);
            });

            //LOADING CAR MODEL
            objLoader.load(carURL.href, function (carObject) {
              carObject.scene.position.set(1, 0.55, 3);
              carObject.scene.scale.set(0.8, 0.8, 0.8);
              scene.add(carObject.scene);
            }, undefined, function (error) {
              console.error(error);
            });

            //LOADING MAN MODEL
            objLoader.load(manURL.href, function (manObject) {
              manObject.scene.position.set(-0.01, 0.055, 3);
              manObject.scene.scale.set(0.006, 0.006, 0.006);
              scene.add(manObject.scene);
            }, undefined, function (error) {
              console.error(error);
            });
            //Green Grass ground 
            const grass = textureLoader.load('./Grass.jpg')
            const Ground = new THREE.BoxGeometry(12, 0.05, 12);
            const GMaterial = new THREE.MeshPhongMaterial({ color: 0x0c5409});
            const GMesh = new THREE.Mesh(Ground, GMaterial);

            GMesh.position.set(0, 0.01, 0);
            
            GMesh.receiveShadow = true;
            scene.add(GMesh);

          
          //SOIL
          const soil = textureLoader.load('./soil.jpg')
           const geometry = new THREE.ConeGeometry( 10.5, 3, 4 ); 
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
          
          



