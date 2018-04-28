import './financeAccount.styl';
import '../styles/antd.css';
import '../styles/base.styl';
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
import '../util/mock.js';

var store = configureStore({}, rootReducer);

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

export default Root
