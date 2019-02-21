import * as THREE from 'three';
import OrbitControls from '../classes/OrbitControls';
import CameraTypes from '../../../constants/CameraTypes';
import _throttle from 'lodash/throttle'

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
  controls.addEventListener('zoom', _throttle((event) => onChange(event.zoom), 100));
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
      2000
  );

  camera.position.z = 210;
  return camera;
}

function perspective({ width, height }) {
  const camera = new THREE.PerspectiveCamera(
      35,
      width / height,
      0.1,
      2000
  );
  camera.position.z = 140;
  camera.position.y = -140;

  return camera;
}
