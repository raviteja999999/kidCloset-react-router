import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import quizReducer from '../reducers/quiz';
import { next, section1Add, newAct, back, rating } from '../actions/quiz';
import { logout } from '../actions/auth';
import moment from 'moment';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      quiz: quizReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  const ob1 = {
    name: 'shakti',
    age: 29
  };

  const ob2 = { ...ob1, designation: 'CEO', age: 40};
  return store;
};
