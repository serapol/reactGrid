import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from './store';
import routes from './routes';
import './styles/main';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

const store = configureStore(appHistory);
const history = syncHistoryWithStore(appHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />
  </Provider>,
  document.getElementById('root')
);
