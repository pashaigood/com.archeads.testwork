import { Map } from 'immutable';
import CameraTypes from '../constants/CameraTypes';

const createName = name => `SCENE/${name}`;

export const Types = {
  CREATE: createName('CREATE'),
  READ: createName('READ'),
  UPDATE: createName('UPDATE'),
  REMOVE: createName('REMOVE'),
  ZOOM: createName('ZOOM'),
  CAMERA_TOGGLE: createName('CAMERA_TOGGLE')
};

const defaultState = new Map({
  path: false,
  zoom: 0,
  cameraType: CameraTypes.PERSPECTIVE
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case Types.READ:
      return state.set('path', action.path);
    case Types.ZOOM:
      return state.set('zoom', state.get('zoom') + action.factor);
    case Types.UPDATE:
      return state.merge(action.payload);
    case Types.CAMERA_TOGGLE:
      const cameraType = CameraTypes.PERSPECTIVE === state.get('cameraType')
          ? CameraTypes.ORTHOGRAPHIC
          : CameraTypes.PERSPECTIVE;
      return state.set('cameraType', cameraType);
    default:
      return state;
  }
}

export function read(path) {
  return {
    type: Types.READ,
    path
  };
}

export function update(payload) {
  return {
    type: Types.UPDATE,
    payload
  };
}

export function setZoom(zoom) {
  return update({
    zoom
  });
}

export function toggleCamera() {
  return {
    type: Types.CAMERA_TOGGLE
  }
}
