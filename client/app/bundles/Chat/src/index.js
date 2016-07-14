import React from 'react'
import ReactOnRails from 'react-on-rails'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './store'
import initTwilio from './twilio'
require('./stylesheets/index.less')


const ChatAppClient = () => {
  initTwilio()
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}


ReactOnRails.register({ ChatAppClient })
