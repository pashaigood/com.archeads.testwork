import {createStore, applyMiddleware} from 'redux';
import middleware from '../middleware';
import rootReducer from '../reducers';

const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware),
);

export default configureStore;
