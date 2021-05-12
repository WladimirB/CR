/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Store } from './providers';

import { history } from './store/store';

import App from './components/app.component.jsx';

ReactDOM.render(
  <Store>
    <Router history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Store>,
  document.getElementById('root'),
);
