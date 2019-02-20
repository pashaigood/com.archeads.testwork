import * as THREE from 'three';
import OrbitControls from '../classes/OrbitControls';
import CameraTypes from '../../../constants/CameraTypes';

export default function({ renderer, cameraType, width, height, onChange }) {
  let camera;

  if (cameraType === CameraTypes.PERSPECTIVE) {
    camera = perspective({ width, height });
  } else {
    camera = orthographic({ width, height });
  }


  const controls = new OrbitControls(
      camera,
      renderer.domElement
  );
  controls.enabled = true;
  controls.maxDistance = camera.position.z;
  controls.minDistance = 0;
  controls.addEventListener('zoom', (event) => onChange(event.zoom));

  camera.controls = controls;

  return camera;
}

function orthographic({ width, height }) {
  const factor = 15;
  const camera = new THREE.OrthographicCamera(
      width / -factor,
      width / factor,
      height / factor,
      height / -factor,
      0.1,
      1000
  );

  camera.position.z = 210;
  return camera;
}

function perspective({ width, height }) {
  const camera = new THREE.PerspectiveCamera(
      35,
      width / height,
      0.1,
      1000
  );
  camera.position.z = 210;

  return camera;
}
