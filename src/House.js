import * as THREE from "three";

const createWall = () => {
  return new THREE.Mesh(
    new THREE.BoxGeometry(3.9, 1.6, 0.1),
    new THREE.MeshPhongMaterial({ color: 0x1d2021 })
  );
};

export function walls() {
  const group = new THREE.Group();

  //Foundation
  const Foundation = new THREE.BoxGeometry(3.9, .25, 4.2);
  const FoundationM = new THREE.MeshPhongMaterial({ color: 0x3b3c3d});
  const FoundationMesh = new THREE.Mesh(Foundation, FoundationM);
  FoundationMesh.position.set(0, 0.13, 0.11);
  group.add(FoundationMesh);

//................................
  const wall1 = createWall();
  wall1.position.set(0, 1.05, -1.95);
  group.add(wall1);

  const wall2 = createWall();
  wall2.position.set(1.9, 1.05, 0);
  wall2.rotation.y = 1.571;
  group.add(wall2);

  const wall3 = createWall();
  wall3.position.set(-1.9, 1.05, 0);
  wall3.rotation.y = 1.571;
  group.add(wall3);
  //.................................

  //Bed..............................
  const Bed = new THREE.BoxGeometry(1.5, .6, 2);
  const BedM = new THREE.MeshPhongMaterial({ color: 'grey'});
  const BedMesh = new THREE.Mesh(Bed, BedM);
  BedMesh.position.set(1.1, .35, -0.9);
  group.add(BedMesh);

  //Wardrobe.................
  const Wardrobe = new THREE.BoxGeometry(.4, 1.2, 1.6);
  const WrdrobeM = new THREE.MeshPhongMaterial({ color: 0x7d3d05});
  const RobeMesh = new THREE.Mesh(Wardrobe, WrdrobeM);
  RobeMesh.position.set(-1.7, .8, -0.9);
  group.add(RobeMesh);

  //Base.......................
  const Base = new THREE.BoxGeometry(1, 0.8, .4);
  const Material = new THREE.MeshPhongMaterial({ color: 0x7d3d05});
  const Mesh = new THREE.Mesh(Base, Material);
  Mesh.position.set(-1, .5, 1.7);
  group.add(Mesh);

  //Front Walls to make the door.........................
  const wall4 = new THREE.BoxGeometry(2.5, 1.5, .1);
  const wall4M = new THREE.MeshPhongMaterial({ color: 0x1d2021});
  const wall4Mesh = new THREE.Mesh(wall4, wall4M);
  wall4Mesh.position.set(-.6, 1, 1.9);
  group.add(wall4Mesh);

  const wall5 = new THREE.BoxGeometry(.3, 1.5, .1);
  const wall5M = new THREE.MeshPhongMaterial({ color: 0x1d2021});
  const wall5Mesh = new THREE.Mesh(wall5, wall5M);
  wall5Mesh.position.set(1.73, 1, 1.9);
  group.add(wall5Mesh);

  const wall6 = new THREE.BoxGeometry(1.4, .3, .1);
  const wall6M = new THREE.MeshPhongMaterial({ color: 0x1d2021});
  const wall6Mesh = new THREE.Mesh(wall6, wall6M);
  wall6Mesh.position.set(1.2, 1.6, 1.9);
  group.add(wall6Mesh);
//................................

  //This is the roofing geometry......................
  const length = 1, width = 1;

    const shape = new THREE.Shape();
    shape.moveTo( 0,0 );
    shape.lineTo( 0, width );
    shape.lineTo( length, width );
    shape.lineTo( length, 0 );
    shape.lineTo( 0, 0 );

    const extrudeSettings = {
        steps: 2,
        depth: 0.13,
        bevelEnabled: true,
        bevelThickness: .5,
        bevelSize: 1.35,
        bevelOffset: 0.25,
        bevelSegments: 1,
    };

    const roof = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const material = new THREE.MeshPhongMaterial( { color: 0x747575 } );
    const mesh = new THREE.Mesh( roof, material ) ;
    mesh.rotation.x = Math.PI / 2;
    mesh.position.set(-0.5, 1.9, -0.5);
    group.add( mesh );
    //..................................................

  return group;
}

