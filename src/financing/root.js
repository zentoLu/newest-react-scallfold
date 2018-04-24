import '../styles/antd.css';
import '../styles/base.styl';
import './financing.styl';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from "react-router-dom";
import createHashHistory from 'history/createHashHistory';
import { Provider } from 'react-redux';
import SignStart from './subpages/sign/start.js';
import SignSuccess from './subpages/sign/success.js';

import RedeemStart from './subpages/redeem/start.js';
import RedeemSuccess from './subpages/redeem/success.js';

import RevokeStart from './subpages/revoke/start.js';
import RevokeSuccess from './subpages/revoke/success.js';

import SurrenderStart from './subpages/surrender/start.js';
import SurrenderSuccess from './subpages/surrender/success.js';
import configureStore from '../stores/configureStore.js';
import MyFinancing from './subpages/myFinancing/index.js';
import FinancingQA from './subpages/financingQA/index.js';
import rootReducer from './reducers';
import { Modal, Button } from 'antd';
import '../util/mock.js';

var store = configureStore({}, rootReducer);
const customHistory = createHashHistory();

const Root = () => (
    <Provider store={store}>
        <Router history={customHistory}>
            <div>
                <Route exact path="/" component={SignStart} />
                <Route path="/sign/start" component={SignStart} />
                <Route path="/sign/success" component={SignSuccess} />
                <Route path="/redeem/start" component={RedeemStart} />
                <Route path="/redeem/success/:amt" component={RedeemSuccess} />
                <Route path="/revoke/start" component={RevokeStart} />
                <Route path="/revoke/success/:amt" component={RevokeSuccess} />
                <Route path="/surrender/start" component={SurrenderStart} />
                <Route path="/surrender/success" component={SurrenderSuccess} />
                <Route path="/myFinancing" component={MyFinancing} />
                <Route path="/financingQA/:qid" component={FinancingQA} />
            </div>
        </Router>
    </Provider>
)

export default Root
