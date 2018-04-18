import React from 'react'
import ReactDOM from 'react-dom'
import Root from './app.js'
import { AppContainer } from 'react-hot-loader'
console.log(Root);
render( Root )

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app.js', () => {
    const NextRoot = require('./app.js').default;
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
