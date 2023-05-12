import * as THREE from "three";

const createPave = () => {
  return new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.05, 0.3),
    new THREE.MeshPhongMaterial({ color: 0x361f07 })
  );
};

export function Paves() {
    const group = new THREE.Group();

    const pave0 = createPave();
    pave0.position.set(1, 0.026, 2.4);
    group.add(pave0);

    const pave = createPave();
    pave.position.set(1, 0.026, 2.8);
    group.add(pave);

    const pave1 = createPave();
    pave1.position.set(1, 0.026, 3.2);
    group.add(pave1);

    const pave2 = createPave();
    pave2.position.set(1, 0.026, 3.6);
    group.add(pave2);

    const pave3 = createPave();
    pave3.position.set(1, 0.026, 4);
    group.add(pave3); 

    const pave4 = createPave();
    pave4.position.set(1, 0.026, 4.4);
    group.add(pave4);

    const pave5 = createPave();
    pave5.position.set(1, 0.026, 4.8);
    group.add(pave5);

    return group;
}