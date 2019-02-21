import React, { Component } from 'react';
import Viewport from './containers/Viewport/Viewport';
import LoadButton from './containers/LoadButton';
import Classes from './App.scss';

class App extends Component {
  render() {
    return (
        <div className={Classes.container}>
          <aside className={Classes.sidebar}>
            <section className={Classes.logo}>
              <a href="/">
                <img
                    src={require('./assets/images/logo.png')}
                    width={176}
                    height={49}
                    alt={'Archeads logo'}
                />
              </a>
            </section>
            <section className={Classes.summaryInfo}>
              <h2 className={Classes.heading}>
                Summary information
              </h2>
            </section>
            <section className={Classes.loadModel}>
              <LoadButton/>
            </section>
          </aside>
          <main className={Classes.viewport}>
            <Viewport/>
          </main>
        </div>
    );
  }
}

export default App;
