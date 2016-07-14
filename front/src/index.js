import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './store'
import initTwilio from './twilio'
require('./stylesheets/index.less')

initTwilio()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
