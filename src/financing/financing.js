import './financing.styl';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from "react-router-dom";
import createHashHistory from 'history/createHashHistory';
import { Provider } from 'react-redux';
import SignStart from './subpages/sign/start.js'
import SignSuccess from './subpages/sign/success.js'
import configureStore from '../stores/configureStore.js';
import rootReducer from './reducers';

import { hot } from 'react-hot-loader'

var store = configureStore({}, rootReducer);

console.log(module.hot);
if (module.hot) {
    module.hot.accept()
}

const customHistory = createHashHistory();

const RouterContainer = () => (
  <Router history={customHistory}>
    <div>
      <Route exact path="/" component={SignStart} />
      <Route path="/sign/start" component={SignStart} />
      <Route path="/sign/success" component={SignSuccess} />
    </div>
  </Router>
);
const App = () => <Provider store={store}><RouterContainer /></Provider>


if (module.hot) {
    const HotApp = hot(module)(App);
    render(
        <HotApp />,
        document.getElementById('app')
    );
}

