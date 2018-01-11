import { combineReducers } from 'redux';
import form from './reducers/form_reducer';
import common from './reducers/common';
import report from './reducers/report';
import framework from './reducers/framework';
import frameworkForm from './reducers/framework_form';

export default combineReducers({
  form,
  common,
  report,
  framework,
  frameworkForm,
});
