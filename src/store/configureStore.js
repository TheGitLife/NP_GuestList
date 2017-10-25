import {createStore, applyMiddleware} from 'redux';
import reducer from '../modules';
import thunk from 'redux-thunk';
import penderMiddleware from 'redux-pender';

export default configureStore = () => {
  const store = createStore(reducer, applyMiddleware(thunk, penderMiddleware()));
  return store;
};
