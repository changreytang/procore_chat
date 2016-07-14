import React from 'react'
import ReactOnRails from 'react-on-rails'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './store'
import initTwilio from './twilio'
import { getUsers } from '../../actions'
require('./stylesheets/index.less')


const ChatAppClient = users => {
  initTwilio()
  store.dispatch(getUsers(users))
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}


ReactOnRails.register({ ChatAppClient })
