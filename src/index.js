import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root.js'
import { AppContainer } from 'react-hot-loader'

render( Root )

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./root.js', () => {
    const NextRoot = require('./root.js').default;
    render( NextRoot )
  })
}

function render ( RootElement ) {
    ReactDOM.render(
        <AppContainer>
            <RootElement/>
        </AppContainer>,
        document.querySelector('#app')
    )
}
