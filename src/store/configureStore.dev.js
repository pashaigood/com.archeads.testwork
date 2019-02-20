import { createStore, applyMiddleware, compose } from 'redux';
import middleware from '../middleware';
import rootReducer from '../ducks';

const configureStore = preloadedState => {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ || (() => {});

  const store = createStore(
      rootReducer,
      preloadedState,
      compose(
          applyMiddleware(...middleware),
          devToolsExtension()
      )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../ducks', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
