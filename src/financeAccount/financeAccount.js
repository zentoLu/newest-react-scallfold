import './financeAccount.styl';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from "react-router-dom";
import createHashHistory from 'history/createHashHistory';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Index from './subpages/';
import Material from './subpages/material';
import AddMaterial from './subpages/addMaterial.js';
import Finish from './subpages/finish.js'

//import configureStore from '../stores/configureStore.js';
import rootReducer from './reducers';

import { hot } from 'react-hot-loader'

function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState
    )

    //window.initState = $.extend(true, {}, store.getState());
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}

var store = configureStore({});



const customHistory = createHashHistory();

const RouterContainer = () => (
  <Router history={customHistory}>
    <div>
      <Route exact path="/" component={Index} />
      <Route exact path="/index" component={Index} />
      <Route path="/material" component={Material} />
      <Route path="/addmaterial" component={AddMaterial} />
      <Route path="/finish" component={Finish} />
    </div>
  </Router>
);
const App = () => <Provider store={store}><RouterContainer /></Provider>

render(
    <App />,
    document.getElementById('app')
)



