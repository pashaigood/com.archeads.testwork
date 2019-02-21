import React from 'react';
import 'animate.css/source/_base.css';
import 'animate.css/source/fading_entrances/fadeIn.css'
import Scene from '../../components/Scene';
import ZoomControl from '../../components/ZoomControl';
import CameraTypeControl from '../../components/CameraTypeControl';
import Classes from './index.scss';

const Viewport = (props) => {
  return (
      <div className={Classes.container}>
        <Scene
            zoom={props.zoom}
            src={props.path}
            cameraType={props.cameraType}
            onZoomChange={props.setZoom}
            className={'animated slow fadeIn'}
        />
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
      </div>
  );
};

export default Viewport;
