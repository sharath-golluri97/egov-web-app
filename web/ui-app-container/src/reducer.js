import { combineReducers } from 'redux';
import form from './reducers/form_reducer';
import common from './reducers/common';

export default combineReducers({
  form,
  common,
});
