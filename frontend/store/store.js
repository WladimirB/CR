import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from './reducer';

const createHistory = require('history').createBrowserHistory;

export const history = createHistory();

const appRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => applyMiddleware(appRouterMiddleware);

export const store = createStore(
  reducer, composeWithDevTools(getMiddleware()),
);
