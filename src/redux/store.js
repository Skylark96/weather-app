import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { weatherDataReducer } from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  weatherDataReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
