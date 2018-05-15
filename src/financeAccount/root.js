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
import ConfirmMaterial from './subpages/confirmMaterial.js';
import Finish from './subpages/finish.js';

import configureStore from '../stores/configureStore.js';
import rootReducer from './reducers';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import '../util/mock1.js';
import "babel-polyfill"
import rootSaga from './sagas'
import Tool from 'tool'

var loginName = Tool.cookie.get('loginName');
var cache = Tool.storage.get('store');
var initialState = {};
if (cache) {
    try {
        initialState = JSON.parse(cache);
        if (initialState.loginName !== loginName) {
            initialState = {}
        }
    } catch (err) {
        console.log(err);
    }
}
var store = configureStore(initialState, rootReducer, rootSaga);

const customHistory = createHashHistory();

const RouterContainer = () => (
    <LocaleProvider locale={zh_CN}>
        <Router history={customHistory}>
            <div>
                <Route exact path="/" component={Index} />
                <Route exact path="/index" component={Index} />
                <Route path="/material" component={Material} />
                <Route path="/addmaterial" component={AddMaterial} />
                <Route path="/confirmMaterial" component={ConfirmMaterial} />
                <Route path="/finish" component={Finish} />
            </div>
        </Router>
    </LocaleProvider>
);

const Root = () => <Provider store={store}><RouterContainer /></Provider>

window.onbeforeunload = function(event) {
    var state = store.getState();
    state.loginName = Tool.cookie.get('loginName');

    var reg = /\"base64\"\:\"(.*?)\"/g;
    var lastStore = JSON.stringify(state).replace(reg, '"base64":""');
    Tool.storage.set('store', lastStore);
    console.log(lastStore.length)

    console.log(Tool.storage.get('store'))

}

export default Root
