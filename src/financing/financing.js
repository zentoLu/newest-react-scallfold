import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root.js'
import { AppContainer } from 'react-hot-loader'
import { ajaxPost } from 'request'
render(Root)

ajaxPost('/user/login', {
    name: '13480704730',
    password: '123456zxc',
    type: 'GW'
}, function(data) {
    console.log(data);
});

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./root.js', () => {
        const NextRoot = require('./root.js').default;
        render(NextRoot)
    })
}

function render(RootElement) {
    ReactDOM.render(
        <AppContainer>
            <RootElement/>
        </AppContainer>,
        document.getElementById('app')
    )
}
