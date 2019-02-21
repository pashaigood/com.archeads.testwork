import React from 'react';
import Classes from './index.scss';
import CameraTypes from '../../constants/CameraTypes';

export default ({ cameraType, ...props }) => (
  <div
    className={Classes.container}
    {...props}
  >
    <div className={Classes.icon}/>
    <div className={Classes.label}>
      {
        CameraTypes.PERSPECTIVE === cameraType ? 'Top view' : 'Perspective'
      }
    </div>
  </div>
)
