import React from 'react';
import Scene from '../../components/Scene';
import ZoomControl from '../../components/ZoomControl';
import CameraTypeControl from '../../components/CameraTypeControl';
import Classes from './index.scss';

const Viewport = (props) => {
  return (
      <div className={Classes.container}>
        <section className={Classes.zoomControl}>
          <ZoomControl
              zoom={props.zoom}
              onChange={props.setZoom}
          />
        </section>
        <section className={Classes.cameraTypeControl}>
          <CameraTypeControl
              cameraType={props.cameraType}
              onClick={props.toggleCamera}
          />
        </section>
        <Scene
            zoom={props.zoom}
            src={props.path}
            cameraType={props.cameraType}
            onZoomChange={props.setZoom}
        />
      </div>
  );
};

export default Viewport;
