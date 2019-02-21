import React from 'react';
import * as PropTypes from 'prop-types';
import * as THREE from 'three';
import ColladaLoader from 'three-collada-loader-2';
import memoize from 'memoize-one';
import sceneFactory from './factories/scene';
import cameraFactory from './factories/camera';

const Style = {
  width: '100%',
  height: '100%',
  overflow: 'hidden'
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

    const { offsetWidth: width, offsetHeight: height } = this.container;

    if (this.camera) {
      this.camera.controls.dispose();
      this.scene.remove(this.camera);
    }

    this.camera = cameraFactory({
      renderer: this.scene.renderer,
      width,
      height,
      cameraType,
      onChange: zoom => this.props.onZoomChange(Math.round((zoom - 1) * 10))
    });
  });

  init = (container) => {
    this.container = container;
    setTimeout(() => {
      this.createScene();
      this.setupLight();
      this.setupScene();
      this.update(this.props);
    }, 0);
  };

  createScene() {
    const { offsetWidth: width, offsetHeight: height } = this.container;

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
    this.container.appendChild(this.scene.renderer.domElement);
  }

  setupLight() {
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

  setupScene() {
    const width = 1000;
    const geometry = new THREE.PlaneGeometry(width, width);
    const texture = new THREE.TextureLoader().load(
        require('../../assets/images/pattern.jpg'));
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    const size = 1000 / 150 * 7;
    texture.repeat.set(size, size);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    var plane = new THREE.Mesh(geometry, material);
    this.scene.add(plane);
  }

  shouldComponentUpdate(props) {
    this.update(props);
    return false;
  }

  update(props) {
    this.openScene(props.src);
    this.setCamera(props.cameraType);
    this.changeZoom(props.zoom, props.cameraType);
  }

  render() {
    return <div ref={this.init} style={Style}/>;
  }
}


