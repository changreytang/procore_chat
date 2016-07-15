import React from 'react'
import ReactOnRails from 'react-on-rails'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './store'
import initTwilio from './twilio'
import { getUsers, getCurrentUser } from './actions'
require('./stylesheets/index.less')


const ChatAppClient = ({ token, users, currentUser }) => {
  initTwilio(token)
  store.dispatch(getUsers(users))
  store.dispatch(getCurrentUser(currentUser))
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}


ReactOnRails.register({ ChatAppClient })
