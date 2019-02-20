import React from 'react';
import { connect } from 'react-redux';
import { changeZoom, setZoom, setCamera } from '../ducks/scene';
import Scene from '../components/Scene';
import CameraTypes from '../constants/CameraTypes'

class Viewport extends React.PureComponent {
  render() {
    return (
        <div>
          <div>
            <button onClick={() => this.props.changeZoom(1)}>+</button>
            <button onClick={() => this.props.changeZoom(-1)}>-</button>
            <span> {this.props.zoom}</span>
          </div>
          <div>
            <button onClick={() => this.props.setCamera(CameraTypes.PERSPECTIVE)}>P</button>
            <button onClick={() => this.props.setCamera(CameraTypes.ORTHOGRAPHIC)}>O</button>
            <span> {this.props.cameraType}</span>
          </div>
          <Scene
              zoom={this.props.zoom}
              src={this.props.path}
              cameraType={this.props.cameraType}
              onZoomChange={this.props.setZoom}
          />
        </div>
    );
  }
}

export default connect(
    state => state.scene.toObject(),
    { changeZoom, setZoom, setCamera }
)(Viewport);
