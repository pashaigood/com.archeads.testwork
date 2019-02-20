import React, { Component } from 'react';
import './App.css';
import Scene from './containers/Viewport';
import LoadButton from './containers/LoadButton'

class App extends Component {
  render() {
    return (
        <div>
          <LoadButton/>
          <Scene/>
        </div>
    );
  }
}

export default App;
