import React from 'react'
import ReactOnRails from 'react-on-rails'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './store'
import { getUsers, getCurrentUser, setMessagingClient } from './actions'
require('./stylesheets/index.scss')


const ChatAppClient = ({ token, users, currentUser }) => {
  store.dispatch(setMessagingClient(token))
  store.dispatch(getUsers(users))
  store.dispatch(getCurrentUser(currentUser))
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}


ReactOnRails.register({ ChatAppClient })
