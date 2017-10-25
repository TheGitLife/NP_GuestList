import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import event from './event';

export default combineReducers({
  event,
  pender: penderReducer
});
