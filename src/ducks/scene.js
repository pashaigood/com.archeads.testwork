import { Map } from 'immutable';
import CameraTypes from '../constants/CameraTypes'

const createName = name => `SCENE/${name}`;

export const Types = {
  CREATE: createName('CREATE'),
  READ: createName('READ'),
  UPDATE: createName('UPDATE'),
  REMOVE: createName('REMOVE'),
  ZOOM: createName('ZOOM')
};

const defaultState = new Map({
  path: false,
  zoom: 0,
  cameraType: CameraTypes.ORTHOGRAPHIC
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case Types.READ:
      return state.set('path', action.path);
    case Types.ZOOM:
      return state.set('zoom', state.get('zoom') + action.factor);
    case Types.UPDATE:
      return state.merge(action.payload);
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
  }
}

export function setZoom(zoom) {
  return update({
    zoom
  })
}

export function setCamera(cameraType) {
  return update({
    cameraType
  })
}

export function changeZoom(factor) {
  return {
    type: Types.ZOOM,
    factor
  }
}
