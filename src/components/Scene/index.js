import React from 'react';
import * as PropTypes from 'prop-types';
import * as THREE from 'three';
import ColladaLoader from 'three-collada-loader-2';
import memoize from 'memoize-one';
import sceneFactory from './factories/scene';
import cameraFactory from './factories/camera';

const Style = {
  width: '100%',
  height: 900
};

export default class extends React.Component {
  static propTypes = {
    zoom: PropTypes.number,
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    cameraType: PropTypes.any,
    onZoomChange: PropTypes.func
  };

  openScene = memoize(src => {
    if (!src) {
      return;
    }
    const loader = new ColladaLoader();
    loader.load(src, collada => {
      let dae = collada.scene;
      dae.scale.x = dae.scale.y = dae.scale.z = 7;
      dae.rotation.z = Math.PI * 2;
      dae.rotation.x = Math.PI * 2;
      dae.castShadow = true;
      dae.receiveShadow = true;
      this.scene.add(dae);
    });
  });

  changeZoom = memoize((zoom) => {
    if (!this.camera) {
      return;
    }

    this.camera.controls.zoom(1 + zoom / 10);
    this.camera.controls.update();
  });

  setCamera = memoize((cameraType) => {
    if (!this.scene) {
      return;
    }

    if (this.camera) {
      this.camera.controls.dispose();
      this.scene.remove(this.camera);
    }

    const dom = document.getElementById('three');
    const { offsetWidth: width, offsetHeight: height } = dom;

    this.camera = cameraFactory({
      renderer: this.scene.renderer,
      width,
      height,
      cameraType,
      onChange: zoom => this.props.onZoomChange(Math.round((zoom - 1) * 10))
    });
  });

  componentDidMount() {
    this.createScene();
    this.createLight();
    this.update(this.props);
  }

  createScene() {
    const dom = document.getElementById('three');
    const { offsetWidth: width, offsetHeight: height } = dom;

    this.scene = sceneFactory({
      width,
      height
    });

    const animate = () => {
      requestAnimationFrame(animate);

      if (this.camera) {
        this.scene.renderer.render(this.scene, this.camera);
      }
    };

    animate();
    dom.appendChild(this.scene.renderer.domElement);
  }

  createLight() {
    const { scene } = this;

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
    directionalLight.position.set(0, -150, 150).normalize();
    directionalLight.castShadow = true;
    directionalLight.receiveShadow = true;
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.left = -1000;
    directionalLight.shadow.camera.right = 1000;
    directionalLight.shadow.camera.top = 1000;
    directionalLight.shadow.camera.bottom = -1000;
    scene.add(directionalLight);
  }

  shouldComponentUpdate(props) {
    this.update(props);
    return false;
  }

  update (props) {
    this.openScene(props.src);
    this.setCamera(props.cameraType);
    this.changeZoom(props.zoom, props.cameraType);
  }

  render() {
    return <div style={Style} id="three"/>;
  }
}
