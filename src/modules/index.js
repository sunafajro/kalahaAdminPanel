import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import app from './reducers/app';
import auth from './reducers/auth';
import categories from './reducers/categories';
import words from './reducers/words';

export default combineReducers({
  routing: routerReducer,
  app,
  auth,
  categories,
  words
})